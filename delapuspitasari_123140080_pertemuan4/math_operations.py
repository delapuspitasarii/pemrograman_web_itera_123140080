PI = 3.14159


def luas_persegi(sisi: float) -> float:
    """Menghitung luas persegi berdasarkan panjang sisi."""
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """Menghitung keliling persegi berdasarkan panjang sisi."""
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung luas persegi panjang."""
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung keliling persegi panjang."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari: float) -> float:
    """Menghitung luas lingkaran berdasarkan jari-jari."""
    return PI * (jari_jari**2)


def keliling_lingkaran(jari_jari: float) -> float:
    """Menghitung keliling lingkaran berdasarkan jari-jari."""
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi temperatur dari Celsius ke Fahrenheit."""
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi temperatur dari Celsius ke Kelvin."""
    return celsius + 273.15


if __name__ == "__main__":
    print("[TEST MODUL INTERNAL] Menjalankan uji coba math_operations.py:")
    print(f"  - Luas Persegi (sisi 4)           : {luas_persegi(4)}")
    print(
        f"  - Luas Lingkaran (r 7)            : {luas_lingkaran(7):.2f}"
    )
    print(
        f"  - Celsius ke Fahrenheit (100 °C)  : {celsius_ke_fahrenheit(100):.2f}"
    )