
import json
from html import escape
from pathlib import Path

archivo_json = Path("reporte-eslint.json")
archivo_html = Path("reporte-eslint.html")

with archivo_json.open("r", encoding="utf-8") as archivo:
    resultados = json.load(archivo)

total_errores = sum(r["errorCount"] for r in resultados)
total_advertencias = sum(r["warningCount"] for r in resultados)

filas = []

for resultado in resultados:
    for mensaje in resultado["messages"]:
        filas.append(f"""
        <tr>
            <td>{escape(resultado["filePath"])}</td>
            <td>{mensaje.get("line", "-")}</td>
            <td>{escape(mensaje["ruleId"] or "General")}</td>
            <td>{escape(mensaje["message"])}</td>
            <td>{'Error' if mensaje['severity'] == 2 else 'Advertencia'}</td>
        </tr>
        """)

tabla = "\n".join(filas) or """
<tr><td colspan="5">No se encontraron errores ni advertencias.</td></tr>
"""

html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Reporte de calidad - ESLint</title>
<style>
body {{ font-family: Arial, sans-serif; margin: 35px; color: #222; }}
h1 {{ color: #174ea6; }}
.resumen {{ display: flex; gap: 25px; margin: 20px 0; }}
.tarjeta {{ padding: 15px; background: #f1f4f9; border-radius: 8px; }}
table {{ border-collapse: collapse; width: 100%; }}
th, td {{ border: 1px solid #ddd; padding: 10px; text-align: left; }}
th {{ background: #174ea6; color: white; }}
tr:nth-child(even) {{ background: #f5f5f5; }}
</style>
</head>
<body>
<h1>Reporte de calidad de código</h1>
<p>Proyecto Vite + React | Análisis estático con ESLint</p>
<div class="resumen">
<div class="tarjeta"><b>Archivos analizados</b><h2>{len(resultados)}</h2></div>
<div class="tarjeta"><b>Errores</b><h2>{total_errores}</h2></div>
<div class="tarjeta"><b>Advertencias</b><h2>{total_advertencias}</h2></div>
</div>
<h2>Detalle de hallazgos</h2>
<table>
<thead>
<tr><th>Archivo</th><th>Línea</th><th>Regla</th><th>Descripción</th><th>Tipo</th></tr>
</thead>
<tbody>{tabla}</tbody>
</table>
</body>
</html>
"""

archivo_html.write_text(html, encoding="utf-8")
print(f"Reporte generado: {archivo_html.resolve()}")