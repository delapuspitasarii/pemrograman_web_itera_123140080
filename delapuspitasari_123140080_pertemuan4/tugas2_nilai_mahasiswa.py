def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """Menghitung nilai akhir berdasarkan bobot 30% UTS, 40% UAS, dan 30% Tugas."""
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """Menentukan grade nilai huruf berdasarkan kriteria A, B, C, D, dan E."""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def main():
    data_mahasiswa = [
        {
            "nama": "I Kadek Maruta Pracheta",
            "nim": "123140085",
            "nilai_uts": 85.0,
            "nilai_uas": 90.0,
            "nilai_tugas": 88.0,
        },
        {
            "nama": "Dela Puspita Sari",
            "nim": "123140080",
            "nilai_uts": 92.0,
            "nilai_uas": 88.0,
            "nilai_tugas": 95.0,
        },
        {
            "nama": "M.Reyshandi",
            "nim": "123140037",
            "nilai_uts": 65.0,
            "nilai_uas": 70.0,
            "nilai_tugas": 75.0,
        },
        {
            "nama": "Ryanda Aditya Irawan",
            "nim": "123140144",
            "nilai_uts": 55.0,
            "nilai_uas": 60.0,
            "nilai_tugas": 58.0,
        },
        {
            "nama": "Mekar Cendra Narwastu",
            "nim": "123140099",
            "nilai_uts": 40.0,
            "nilai_uas": 45.0,
            "nilai_tugas": 50.0,
        },
    ]

    for mhs in data_mahasiswa:
        na = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["nilai_akhir"] = na
        mhs["grade"] = tentukan_grade(na)

    print("=" * 68)
    print("               LAPORAN REKAPITULASI NILAI MAHASISWA               ")
    print("=" * 68)
    print(
        f"{'NO':<4} | {'NIM':<10} | {'NAMA MAHASISWA':<20} | {'NILAI AKHIR':<11} | {'GRADE':<5}"
    )
    print("-" * 68)

    for i, mhs in enumerate(data_mahasiswa, start=1):
        print(
            f"{i:<4} | {mhs['nim']:<10} | {mhs['nama']:<20} | {mhs['nilai_akhir']:<11.2f} | {mhs['grade']:^5}"
        )

    print("=" * 68)

    mhs_tertinggi = max(data_mahasiswa, key=lambda x: x["nilai_akhir"])
    mhs_terendah = min(data_mahasiswa, key=lambda x: x["nilai_akhir"])

    print("\nINFORMASI CAPAIAN AKADEMIK:")
    print(
        f"  * Nilai Akhir Tertinggi : {mhs_tertinggi['nama']} ({mhs_tertinggi['nim']}) - {mhs_tertinggi['nilai_akhir']:.2f} (Grade {mhs_tertinggi['grade']})"
    )
    print(
        f"  * Nilai Akhir Terendah  : {mhs_terendah['nama']} ({mhs_terendah['nim']}) - {mhs_terendah['nilai_akhir']:.2f} (Grade {mhs_terendah['grade']})"
    )
    print("=" * 68)


if __name__ == "__main__":
    main()