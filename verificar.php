<?php
// Datos de conexión a la base de datos
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

// Obtener el token de la URL
$token = $_GET['token'] ?? '';

// Verificar si el token está presente
if (empty($token)) {
    die("Token no válido o no proporcionado.");
}

// Crear la consulta SQL para verificar el token
$sql = "SELECT id FROM usuarios WHERE token = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario con el token proporcionado
if ($result->num_rows > 0) {
    // Actualizar el estado del usuario a verificado
    $sql_update = "UPDATE usuarios SET token = NULL, verificado = 1 WHERE token = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("s", $token);
    
    if ($stmt_update->execute() === TRUE) {
        echo "Correo electrónico verificado exitosamente. Ahora puedes iniciar sesión.";
    } else {
        echo "Error al actualizar el estado del usuario.";
    }
    $stmt_update->close();
} else {
    echo "Token no válido o el usuario ya ha sido verificado.";
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
