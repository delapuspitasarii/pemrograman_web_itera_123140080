def hitung_bmi(berat: float, tinggi: float) -> tuple[float, str]:
    """Menghitung nilai BMI dan menentukan kategori berat badan."""
    bmi = berat / (tinggi**2)

    if bmi < 18.5:
        kategori = "Berat badan kurang"
    elif 18.5 <= bmi < 25.0:
        kategori = "Berat badan normal"
    elif 25.0 <= bmi < 30.0:
        kategori = "Berat badan berlebih"
    else:
        kategori = "Obesitas"

    return bmi, kategori


def main():
    print("=" * 45)
    print("     PROGRAM PENGHITUNG BMI (BODY MASS INDEX)    ")
    print("=" * 45)

    try:
        berat_input = float(input("Masukkan berat badan (kg): "))
        tinggi_input = float(input("Masukkan tinggi badan (m) : "))

        if berat_input <= 0 or tinggi_input <= 0:
            print(
                "[ERROR] Berat dan tinggi badan harus bernilai lebih dari 0."
            )
            return

        bmi, kategori = hitung_bmi(berat_input, tinggi_input)

        print("-" * 45)
        print("HASIL PERHITUNGAN BMI:")
        print(f"  * Nilai BMI : {bmi:.2f}")
        print(f"  * Kategori  : {kategori}")
        print("=" * 45)

    except ValueError:
        print("[ERROR] Harap masukkan angka desimal/bulat yang valid!")


if __name__ == "__main__":
    main()