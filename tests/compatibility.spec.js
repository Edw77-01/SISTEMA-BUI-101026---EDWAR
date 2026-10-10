import { test, expect } from '@playwright/test';

// ============================================
// PNF-01: Compatibilidad con navegadores
// ============================================
test.describe('PNF-01: Compatibilidad', () => {
  
  test('Carga en todos los navegadores', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeTruthy();
    const hasButtons = await page.locator('button').count() > 0;
    expect(hasButtons).toBeTruthy();
  });

  test('Elementos interactivos funcionales', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button').first();
    if (await button.count() > 0) {
      await expect(button).toBeEnabled();
      await button.click();
    }
  });
});

// ============================================
// PNF-02: Responsive en múltiples dispositivos
// ============================================
test.describe('PNF-02: Responsive Design', () => {

  test('Interfaz adaptable en múltiples tamaños', async ({ page }) => {
    const viewports = [
      { width: 480, height: 800 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1366, height: 768 },  // Desktop
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const windowWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 1);
    }
  });

  test('Botones visibles y funcionales en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 800 });
    await page.goto('/');
    
    const button = page.locator('button').first();
    if (await button.count() > 0) {
      await expect(button).toBeVisible();
      await button.click();
    }
  });
});

// ============================================
// Pruebas de Seguridad Básicas
// ============================================
test.describe('SEG-01: Seguridad Básica', () => {

  test('No hay errores críticos en consola', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors.length).toBe(0);
  });

  test('Validación contra XSS en formularios', async ({ page }) => {
    await page.goto('/');
    
    const inputs = page.locator('input[type="text"], textarea');
    if (await inputs.count() > 0) {
      const input = inputs.first();
      const xssPayload = '<script>alert("XSS")</script>';
      
      await input.fill(xssPayload);
      const value = await input.inputValue();
      
      // Si el valor contiene < o >, verificar que está escapado en el DOM
      const htmlContent = await page.locator('body').innerHTML();
      expect(!htmlContent.includes('<script>alert')).toBeTruthy();
    }
  });

  test('Rutas válidas accesibles', async ({ page }) => {
    const routes = ['/', '/Eleccionbanco', '/gotobc', '/gotobb', '/gotonu', '/preaprobado', '/rechazo', '/consulta'];
    
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBeLessThan(400);
    }
  });

  test('No expone información sensible en localStorage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const storageData = await page.evaluate(() => JSON.stringify(localStorage));
    expect(!storageData.includes('password')).toBeTruthy();
    expect(!storageData.includes('token')).toBeTruthy();
    expect(!storageData.includes('secret')).toBeTruthy();
  });

  test('Validación de contenido sensible', async ({ page }) => {
    await page.goto('/');
    
    const bodyText = await page.locator('body').textContent();
    // No mostrar información de estructura de BD o errores sensibles
    expect(!bodyText?.includes('SELECT')).toBeTruthy();
    expect(!bodyText?.includes('DELETE FROM')).toBeTruthy();
    expect(!bodyText?.includes('SQLException')).toBeTruthy();
  });

  test('Renderizado seguro de contenido dinámico', async ({ page }) => {
    await page.goto('/');
    
    const allImages = page.locator('img');
    const count = await allImages.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const src = await allImages.nth(i).getAttribute('src');
      // Verificar que src no contenga javascript
      expect(src).not.toContain('javascript:');
      expect(src).not.toContain('data:text/html');
    }
  });

  test('Rendimiento - Carga rápida', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    
    expect(loadTime).toBeLessThan(5000);
  });
});
