from PIL import Image, ImageDraw
import random

# Tamaño de la imagen
width, height = 300, 500

# Crear una nueva imagen con fondo blanco
image = Image.new("RGB", (width, height), "white")
draw = ImageDraw.Draw(image)

# Número de puntos negros
num_points = 69

# Tamaño de los puntos (diámetro)
point_diameter = 3

# Generar coordenadas aleatorias para los puntos negros
black_points = [(random.randint(point_diameter, width - point_diameter),
                 random.randint(point_diameter, height - point_diameter))
                for _ in range(num_points)]

# Dibujar los puntos negros en la imagen
for point in black_points:
    draw.ellipse([point[0] - point_diameter, point[1] - point_diameter,
                  point[0] + point_diameter, point[1] + point_diameter], fill="black")

# Guardar la imagen
image.save("output_image_round_points_fixed_size.png")
