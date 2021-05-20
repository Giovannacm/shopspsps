import sqlite3

conn = sqlite3.connect('data.db')

print('Banco de dados aberto com sucesso!')

'''conn.execute(""" CREATE TABLE IF NOT EXISTS products (
	id integer PRIMARY KEY not null,
	name text NOT NULL,
	category text NOT NULL,
	price real NOT NULL,
	img text NOT NULL,
	description text NOT NULL
	); """)

print('Tabela criada com sucesso!')'''

'''data = [
	(
		1,
		"Ração 1",
		"Ração",
		19.80,
		"imgs/racao1.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		2,
		"Ração 2",
		"Ração",
		21.70,
		"imgs/racao2.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		3,
		"Ração 3",
		"Ração",
		13.50,
		"imgs/racao3.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		4,
		"Ração 4",
		"Ração",
		22.10,
		"imgs/racao4.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		5,
		"Ração 5",
		"Ração",
		25.90,
		"imgs/racao5.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		6,
		"Ração 6",
		"Ração",
		15.30,
		"imgs/racao6.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		7,
		"Ração 7",
		"Ração",
		16.40,
		"imgs/racao7.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		8,
		"Ração 8",
		"Ração",
		17.40,
		"imgs/racao8.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		9,
		"Ração 9",
		"Ração",
		14.10,
		"imgs/racao9.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		10,
		"Brinquedo 1",
		"Brinquedo",
		19.80,
		"imgs/brinquedo1.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		11,
		"Brinquedo 2",
		"Brinquedo",
		21.70,
		"imgs/brinquedo2.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		12,
		"Brinquedo 3",
		"Brinquedo",
		13.50,
		"imgs/brinquedo3.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		13,
		"Brinquedo 4",
		"Brinquedo",
		22.10,
		"imgs/brinquedo4.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		14,
		"Brinquedo 5",
		"Brinquedo",
		25.90,
		"imgs/brinquedo5.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		15,
		"Brinquedo 6",
		"Brinquedo",
		15.30,
		"imgs/brinquedo6.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		16,
		"Brinquedo 7",
		"Brinquedo",
		16.40,
		"imgs/brinquedo7.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		17,
		"Brinquedo 8",
		"Brinquedo",
		17.40,
		"imgs/brinquedo8.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		18,
		"Brinquedo 9",
		"Brinquedo",
		14.10,
		"imgs/brinquedo9.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		19,
		"Higiene 1",
		"Higiene",
		19.80,
		"imgs/higiene1.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		20,
		"Higiene 2",
		"Higiene",
		21.70,
		"imgs/higiene2.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		21,
		"Higiene 3",
		"Higiene",
		13.50,
		"imgs/higiene3.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		22,
		"Higiene 4",
		"Higiene",
		22.10,
		"imgs/higiene4.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		23,
		"Higiene 5",
		"Higiene",
		25.90,
		"imgs/higiene5.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		24,
		"Higiene 6",
		"Higiene",
		15.30,
		"imgs/higiene6.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		25,
		"Higiene 7",
		"Higiene",
		22.10,
		"imgs/higiene7.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		26,
		"Higiene 8",
		"Higiene",
		25.90,
		"imgs/higiene8.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		27,
		"Higiene 9",
		"Higiene",
		15.30,
		"imgs/higiene9.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		28,
		"Coleira 1",
		"Coleira",
		19.80,
		"imgs/coleira1.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		29,
		"Coleira 2",
		"Coleira",
		21.70,
		"imgs/coleira2.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		30,
		"Coleira 3",
		"Coleira",
		13.50,
		"imgs/coleira3.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		31,
		"Outros 1",
		"Outros",
		19.80,
	 	"imgs/outros1.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	),
	(
		32,
		"Outros 2",
		"Outros",
		21.70,
		"imgs/outros2.jfif",
		"Essa ração é a mais cara. Os gatos sempre vão comer dela, até sem fome."
	),
	(
		33,
		"Outros 3",
		"Outros",
		13.50,
		"imgs/outros3.jfif",
		"Essa ração é a mais barata. Talvez eles não gostem muito, por conta do sabor."
	),
	(
		34,
		"Outros 4",
		"Outros",
		22.10,
		"imgs/outros4.jfif",
		"Essa ração é mediana, mas é boa e legal. Os gatos vão comer sempre."
	)
]

for product in data:
    conn.execute("""INSERT INTO products (id, name, category, price, img, description) VALUES (?, ?, ?, ?, ?, ?);""", product)

conn.commit()'''

conn.close()