
import { Client } from 'pg';
import { Contexto_consulta } from './pages/consulta';
function selectvalues() {
const { consulta_cedula } = useContext(Contexto_consulta);
//Credenciales
const client = new Client ({
host: "localhost",
user: "postgres",
port: 5432,
password: "12345678",
database: "sistemabui"


})
// Conexion a base de datos
client.connect();

client.query('INSERT INTO datos (cedula_cliente) VALUES (',consulta_cedula,')', (err, res)=>{
if (!err) {
    console.log(res.rows)
}else{
    console.log(err.message)
}
client.end;

})

}export default selectvalues;