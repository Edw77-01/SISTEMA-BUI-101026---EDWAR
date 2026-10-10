import { test, expect } from '@playwright/test';

// 1. Aumentamos el timeout global a 60 segundos. (Si el timeout global es 30s, 
// ponerle 60s al 'goto' no sirve de nada, el test muere a los 30s).
test.setTimeout(60_000);

// Usamos la IP local explícita para evitar que se cuelgue resolviendo "localhost" (IPv6)
const URL_BASE = 'http://127.0.0.1:5173/'; 

test('debe cargar la página principal', async ({ page }) => {
  // Quitamos configuraciones raras. El comportamiento por defecto ('load') es el mejor.
  await page.goto(URL_BASE);

  // 2. Le damos al PRIMER expect de la prueba 15 segundos para que espere 
  // a que React (Vite) termine de montar la interfaz.
  const titulo = page.getByRole('heading', { name: 'ESCOGE' });
  await expect(titulo).toBeVisible({ timeout: 15_000 });
  
  await expect(page.locator('header#header')).toBeVisible();
  await expect(page.getByRole('button', { name: /CONSULTA CLIENTE Y GARANTIAS/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /EVALUACION CREDITO/i })).toBeVisible();
});

test('debe cargar el logo del banco', async ({ page }) => {
  await page.goto(URL_BASE);

  // Le damos tiempo extra solo a la primera validación
  const logo = page.locator('img[alt="Logo Banco"]');
  await expect(logo).toBeVisible({ timeout: 15_000 });
  
  await expect(page.locator('#imglogo1')).toBeVisible();
  await expect(page.locator('header#header')).toContainText('BANCOS UNIDOS PARA LA INOVACION');
});

test('debe navegar a la pantalla de elección de banco', async ({ page }) => {
  await page.goto(URL_BASE);

  // Esperamos a que aparezca el botón antes de intentar hacerle clic
  const botonEvaluacion = page.getByRole('button', { name: /EVALUACION CREDITO/i });
  await expect(botonEvaluacion).toBeVisible({ timeout: 15_000 });
  await botonEvaluacion.click();

  // 3. Validación de URL flexible (ignora mayúsculas/minúsculas y slashes finales)
  await expect(page).toHaveURL(/.*eleccionbanco.*/i, { timeout: 15_000 });
  await expect(page.getByRole('heading', { name: /ELIGE ENTIDAD FINANCIERA/i })).toBeVisible();
});