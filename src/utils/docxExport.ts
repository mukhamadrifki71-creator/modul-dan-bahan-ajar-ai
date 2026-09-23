import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import { ModulInputData } from '../types';

export async function exportModulToWord(
  title: string,
  content: string,
  inputData: Partial<ModulInputData>
) {
  const lines = content.split('\n');
  const docParagraphs: (Paragraph | Table)[] = [];

  // Kop / Judul Dokumen Resmi
  docParagraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN (RPP)',
          bold: true,
          size: 28, // 14pt
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: 'PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI',
          bold: true,
          size: 26, // 13pt
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: 'BERBASIS DEEP LEARNING & KURIKULUM BERBASIS CINTA (RAHMATAN LIL \'ALAMIN)',
          italics: true,
          size: 22, // 11pt
          font: 'Times New Roman',
        }),
      ],
    })
  );

  // Tabel Identitas Singkat
  if (inputData) {
    const infoRows = [
      ['Satuan Pendidikan', inputData.namaSekolah || 'Sekolah Penggerak / Negeri'],
      ['Mata Pelajaran', inputData.mataPelajaran || 'Pendidikan Agama Islam dan Budi Pekerti'],
      ['Fase / Kelas / Semester', `${inputData.faseKelas || '-'} / ${inputData.semester || 'Ganjil/Genap'}`],
      ['Elemen PAI', inputData.elemen || '-'],
      ['Materi Pokok / Topik', inputData.materi || '-'],
      ['Alokasi Waktu', `${inputData.jumlahPertemuan || '2 Pertemuan'} (${inputData.alokasiWaktu || '4 JP'})`],
      ['Metode Pembelajaran', inputData.metodePembelajaran || 'Problem Based Learning'],
      ['8 Dimensi Profil Lulusan', (inputData.dimensiProfilPancasila && inputData.dimensiProfilPancasila.length > 0) ? inputData.dimensiProfilPancasila.join(', ') : 'Keimanan dan Ketakwaan terhadap Tuhan YME, Penalaran Kritis, Kolaborasi, Komunikasi'],
      ['Guru Mata Pelajaran', `${inputData.namaGuru || 'Guru PAI'} ${inputData.nip ? `(NIP. ${inputData.nip})` : ''}`],
    ];

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: infoRows.map(
        ([label, value]) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: label,
                        bold: true,
                        size: 20,
                        font: 'Times New Roman',
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 70, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `: ${value}`,
                        size: 20,
                        font: 'Times New Roman',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
      ),
    });

    docParagraphs.push(table);
    docParagraphs.push(
      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({
            text: '_________________________________________________________________________________',
            color: '888888',
          }),
        ],
      })
    );
  }

  // Parse lines of the AI generated markdown
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      docParagraphs.push(new Paragraph({ spacing: { after: 100 } }));
      continue;
    }

    if (trimmed.startsWith('# ')) {
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: trimmed.replace(/^#\s+/, ''),
              bold: true,
              size: 26,
              color: '1E3A8A',
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (trimmed.startsWith('## ')) {
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: trimmed.replace(/^##\s+/, ''),
              bold: true,
              size: 24,
              color: '047857',
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (trimmed.startsWith('### ')) {
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 80 },
          children: [
            new TextRun({
              text: trimmed.replace(/^###\s+/, ''),
              bold: true,
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const cleanText = trimmed.replace(/^[-*]\s+/, '');
      docParagraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: cleanText.replace(/\*\*(.*?)\*\*/g, '$1'),
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const cleanText = trimmed.replace(/^\d+\.\s+/, '');
      docParagraphs.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `${trimmed.match(/^\d+\./)?.[0] || ''} `,
              bold: true,
              size: 22,
              font: 'Times New Roman',
            }),
            new TextRun({
              text: cleanText.replace(/\*\*(.*?)\*\*/g, '$1'),
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else {
      // Standard paragraph
      docParagraphs.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: trimmed.replace(/\*\*(.*?)\*\*/g, '$1'),
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    }
  }

  // Lembar Pengesahan Tanda Tangan Guru & Kepala Sekolah
  docParagraphs.push(
    new Paragraph({
      spacing: { before: 360, after: 120 },
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: `Mengetahui,\n${inputData.namaSekolah ? inputData.namaSekolah + ', ' : ''}${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`,
          size: 22,
          font: 'Times New Roman',
        }),
      ],
    })
  );

  const signatureTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Kepala Sekolah,',
                    bold: true,
                    size: 22,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({ spacing: { after: 600 } }), // Ruang tanda tangan
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: inputData.namaKepalaSekolah || '( ________________________ )',
                    bold: true,
                    underline: {},
                    size: 22,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: inputData.nipKepalaSekolah ? `NIP. ${inputData.nipKepalaSekolah}` : 'NIP. ........................................',
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Guru Pendidikan Agama Islam,',
                    bold: true,
                    size: 22,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({ spacing: { after: 600 } }), // Ruang tanda tangan
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: inputData.namaGuru || '( ________________________ )',
                    bold: true,
                    underline: {},
                    size: 22,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: inputData.nip ? `NIP. ${inputData.nip}` : 'NIP. ........................................',
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  docParagraphs.push(signatureTable);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch / 2.54 cm
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: docParagraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `Modul_Ajar_PAI_${(inputData.materi || 'DeepLearning').replace(/\s+/g, '_').slice(0, 30)}.docx`;
  saveAs(blob, fileName);
}

export async function exportBahanAjarToWord(
  title: string,
  content: string,
  inputData: Partial<ModulInputData>
) {
  const lines = content.split('\n');
  const docParagraphs: (Paragraph | Table)[] = [];

  // Kop / Judul Bahan Ajar
  docParagraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'BAHAN AJAR PESERTA DIDIK PAI & BUDI PEKERTI',
          bold: true,
          size: 28, // 14pt
          font: 'Times New Roman',
          color: '1E3A8A',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: 'MENJELAJAHI HIKMAH DENGAN HATI (DEEP LEARNING & KURIKULUM BERBASIS CINTA)',
          bold: true,
          size: 24, // 12pt
          font: 'Times New Roman',
          color: '047857',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `${inputData.namaSekolah || 'Satuan Pendidikan'} • ${inputData.faseKelas || 'Fase D'} • Semester ${inputData.semester || 'Ganjil'}`,
          italics: true,
          size: 20, // 10pt
          font: 'Times New Roman',
        }),
      ],
    })
  );

  // Parse lines of the markdown
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      docParagraphs.push(new Paragraph({ spacing: { after: 100 } }));
      continue;
    }

    if (trimmed.startsWith('# ')) {
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: trimmed.replace(/^#\s+/, ''),
              bold: true,
              size: 26,
              color: '1E3A8A',
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (trimmed.startsWith('## ')) {
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: trimmed.replace(/^##\s+/, ''),
              bold: true,
              size: 24,
              color: '047857',
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (trimmed.startsWith('### ')) {
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 80 },
          children: [
            new TextRun({
              text: trimmed.replace(/^###\s+/, ''),
              bold: true,
              size: 22,
              color: '0F766E',
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const cleanText = trimmed.replace(/^[-*]\s+/, '');
      docParagraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: cleanText.replace(/\*\*(.*?)\*\*/g, '$1'),
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const cleanText = trimmed.replace(/^\d+\.\s+/, '');
      docParagraphs.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `${trimmed.match(/^\d+\./)?.[0] || ''} `,
              bold: true,
              size: 22,
              font: 'Times New Roman',
            }),
            new TextRun({
              text: cleanText.replace(/\*\*(.*?)\*\*/g, '$1'),
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else if (trimmed.startsWith('>')) {
      docParagraphs.push(
        new Paragraph({
          spacing: { before: 100, after: 100 },
          indent: { left: 720 },
          children: [
            new TextRun({
              text: trimmed.replace(/^>\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1'),
              italics: true,
              size: 22,
              color: '4338CA',
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else {
      docParagraphs.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: trimmed.replace(/\*\*(.*?)\*\*/g, '$1'),
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: docParagraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `Bahan_Ajar_Siswa_PAI_${(inputData.materi || 'DeepLearning').replace(/\s+/g, '_').slice(0, 30)}.docx`;
  saveAs(blob, fileName);
}

