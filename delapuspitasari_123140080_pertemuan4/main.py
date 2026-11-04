import math_operations as mo
from math_operations import PI, celsius_ke_fahrenheit, celsius_ke_kelvin


def main():
    print("=" * 55)
    print("      PROGRAM UTAMA PENGUJIAN MODUL MATH_OPERATIONS     ")
    print("=" * 55)

    print(f"Nilai Konstanta PI : {PI}")

    print("\n--- 1. KALKULASI GEOMETRI ---")
    sisi = 5.0
    print(f"[Persegi] Sisi = {sisi}")
    print(f"  * Luas     : {mo.luas_persegi(sisi):.2f}")
    print(f"  * Keliling : {mo.keliling_persegi(sisi):.2f}")

    panjang, lebar = 8.0, 4.0
    print(f"\n[Persegi Panjang] Panjang = {panjang}, Lebar = {lebar}")
    print(f"  * Luas     : {mo.luas_persegi_panjang(panjang, lebar):.2f}")
    print(
        f"  * Keliling : {mo.keliling_persegi_panjang(panjang, lebar):.2f}"
    )

    r = 7.0
    print(f"\n[Lingkaran] Jari-jari = {r}")
    print(f"  * Luas     : {mo.luas_lingkaran(r):.2f}")
    print(f"  * Keliling : {mo.keliling_lingkaran(r):.2f}")

    print("\n--- 2. KONVERSI SUHU ---")
    suhu_celsius = 30.0
    fahrenheit = celsius_ke_fahrenheit(suhu_celsius)
    kelvin = celsius_ke_kelvin(suhu_celsius)

    print(f"Suhu Awal : {suhu_celsius:.2f} °C")
    print(f"  * Fahrenheit : {fahrenheit:.2f} °F")
    print(f"  * Kelvin     : {kelvin:.2f} K")

    print("=" * 55)


if __name__ == "__main__":
    main()