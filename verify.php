<?php
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "datebaseoncoscan";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$token = $_GET['token'] ?? '';

if ($token) {
    $key = "example_key"; // La misma clave secreta utilizada para crear el token

    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $correo = $decoded->email;

        // Actualizar el estado de verificación del usuario en la base de datos
        $sql = "UPDATE usuarios SET verificado = 1 WHERE correo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $correo);

        if ($stmt->execute() === TRUE) {
            echo "Correo electrónico verificado con éxito.";
        } else {
            echo "Error actualizando la verificación.";
        }

        $stmt->close();
    } catch (Exception $e) {
        echo "Token inválido: " . $e->getMessage();
    }
} else {
    echo "No se proporcionó un token.";
}

$conn->close();
?>
