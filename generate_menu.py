#!/usr/bin/env python3
"""KuchennyPlan — przejrzysty jadłospis z czytelnym podziałem na sekcje."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

pdfmetrics.registerFont(TTFont("ArialUni", "/Library/Fonts/Arial Unicode.ttf"))

# ─── PASTEL SAGE PALETTE ───────────────────────────────────
BG      = HexColor("#FEFCF7")     # strona
SAGE    = HexColor("#7DA08A")     # akcent główny
SAGE_D  = HexColor("#4F735C")     # ciemny akcent
SAGE_L  = HexColor("#D6E6D4")     # jasne tło
PEACH   = HexColor("#F2D1BD")     # brzoskwinia
BLUE    = HexColor("#BCD6EA")     # błękit
LAV     = HexColor("#D5C8E2")     # lawenda
PINK    = HexColor("#EDC8C8")     # róż
GOLD    = HexColor("#E6C888")     # złoty
WHITE   = HexColor("#FFFEFC")

# ─── COLORS FOR SECTIONS ──────────────────────────────────
C_TITLE  = HexColor("#C47050")     # terakota — TYTUŁ DANIA
C_MACRO  = HexColor("#6A7F8A")     # stalowy błękit — MAKRO
C_ING    = HexColor("#5C8A6A")     # leśna zieleń — SKŁADNIKI
C_PREP   = HexColor("#2A3A2E")     # ciemna zieleń — PRZYGOTOWANIE
C_TM6    = HexColor("#7A5C9E")     # fiolet — TM6
C_WARN   = HexColor("#D0805C")     # ciepły pomarańcz — uwagi
C_TEXT   = HexColor("#2C3A2E")
C_MUTED  = HexColor("#8AA08E")

OUTPUT = os.path.expanduser("~/Desktop/jadlospis_tygodniowy.pdf")
doc = SimpleDocTemplate(OUTPUT, pagesize=A4, topMargin=16*mm, bottomMargin=16*mm,
                        leftMargin=16*mm, rightMargin=16*mm)
W = 192*mm

def ps(name, **kw):
    d = {"fontName": "ArialUni", "textColor": C_TEXT}
    d.update(kw)
    return ParagraphStyle(name, **d)

E = []
def sp(h=3): E.append(Spacer(1, h))
def hr(): E.append(HRFlowable(width="100%", thickness=0.6, color=SAGE_L, spaceAfter=6, spaceBefore=2))

# ═══════════════ 1. HEADER ═══════════════════════════════════
E.append(Paragraph("<b>🍳 KuchennyPlan</b>", ps("T", fontSize=22, leading=26, textColor=SAGE_D, spaceAfter=0)))
E.append(Paragraph("Tygodniowy jadłospis • Renata &amp; Rafał • Zdrowo, z głową, bez marnowania",
                   ps("SU", fontSize=9, textColor=C_MUTED, spaceAfter=10)))
hr()

# ═══════════════ 2. SHOPPING LIST ═══════════════════════════
E.append(Paragraph("📋 <b>Lista zakupów — Stokrotka</b>", ps("SH", fontSize=13, textColor=SAGE_D, spaceAfter=6)))

SHOP = [
    ("🥦 Warzywa", PEACH, ["Brokuły 1szt", "Ziemniaki 500g", "Batat 1szt (niski IG!)", "Cebula 2szt", "Czosnek 1 główka", "Pomidory świeże 3szt", "Szpinak świeży 150g", "Mix sałat 2op", "Ogórek świeży 2szt", "Rzodkiewka 2pęczki", "Papryka czerwona 1szt", "Cukinia 1szt", "Marchewka 2szt", "Pomidory krojone puszka 1szt", "Kapusta pekińska 1szt"]),
    ("🧀 Nabiał & Jaja", BLUE, ["Jajka 15szt", "Ser żółty 200g", "Twaróg półtłusty 400g", "Feta 200g", "Masło kostka", "Jogurt grecki 2% 400g (b.ważne!)"]),
    ("🥩 Białko (kluczowe!)", LAV, ["Pierś z kurczaka 400g", "Łosoś świeży 400g (omega-3!)", "Tuńczyk w puszce 2szt", "Ciecierzyca puszka 1szt", "Mleko kokosowe puszka 1szt", "Tofu naturalne 500g"]),
    ("🍞 Produkty suche", PINK, ["Chleb żytni razowy 1 bochenek", "Kasza gryczana", "Ryż brązowy", "Oliwa z oliwek EV", "Orzechy włoskie", "Przyprawy: kurkuma, kumin, curry, papryka słodka, czosnek granulowany"]),
    ("🍎 Owoce (przekąski niski IG)", GOLD, ["Jabłka 3szt", "Cytryna 2szt", "Awokado 2szt"]),
]

shop_table = [[
    Paragraph("<b>Kategoria</b>", ps("SK", fontSize=8, textColor=white, fontName="ArialUni")),
    Paragraph("<b>Lista</b>", ps("SK", fontSize=8, textColor=white, fontName="ArialUni")),
]]
for cat, color, items in SHOP:
    shop_table.append([
        Paragraph(f"<b>{cat}</b>", ps("SC", fontSize=8, textColor=SAGE_D, fontName="ArialUni", spaceAfter=2)),
        Paragraph("<br/>".join([f"• {i}" for i in items]), ps("SI", fontSize=7, leading=9, textColor=C_TEXT)),
    ])

st = TableStyle([
    ('BACKGROUND', (0,0), (-1,0), SAGE_D),
    ('GRID', (0,0), (-1,-1), 0.3, SAGE_L),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('TOPPADDING', (0,0), (-1,-1), 2), ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('LEFTPADDING', (0,0), (-1,-1), 5), ('RIGHTPADDING', (0,0), (-1,-1), 5),
])
for i in range(1, len(shop_table)):
    st.add('BACKGROUND', (0,i), (-1,i), SHOP[i-1][1])
shop_t = Table(shop_table, colWidths=[68*mm, 124*mm])
shop_t.setStyle(st)
E.append(shop_t)
sp(6)

E.append(Paragraph("💡 <i>Macie w domu: jajka, ser żółty, chleb żytni, tofu, feta, oliwa</i>",
                   ps("NT", fontSize=8, textColor=C_WARN, spaceAfter=4)))

# ─── Diabetes tip bar ───
tip_data = [[
    Paragraph("<b>💙 Dla Renaty — cukier pod kontrolą:</b> Białko do każdego posiłku. "
              "Jedz co 3-4h. Wypij wodę przed jedzeniem. Zero słodkich napojów. "
              "Kurkuma i cynamon pomagają stabilizować cukier.",
              ps("TP", fontSize=7, leading=9, textColor=HexColor("#3A7A9A"))),
]]
E.append(Table(tip_data, colWidths=[W]).setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), HexColor("#EEF5F8")),
    ('BOX', (0,0), (-1,-1), 0.4, BLUE),
    ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('LEFTPADDING', (0,0), (-1,-1), 6), ('RIGHTPADDING', (0,0), (-1,-1), 6),
])))
sp(6)
hr()

# ═════════════════════════════════════════════════════════════
#  MEAL PLAN — DZIEŃ 1
# ═════════════════════════════════════════════════════════════
def day_header(dow, date, kcal_r, kcal_m):
    data = [[
        Paragraph(f"📅 <b>{dow} — {date}</b>", ps("DH", fontSize=11, textColor=white, fontName="ArialUni")),
        Paragraph(f"R: {kcal_r} kcal &nbsp;|&nbsp; M: {kcal_m} kcal", ps("DH", fontSize=9, textColor=white, alignment=TA_RIGHT)),
    ]]
    t = Table(data, colWidths=[W-55*mm, 55*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), SAGE_D),
        ('TOPPADDING', (0,0), (-1,-1), 5), ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8), ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    E.append(t)
    sp(4)

def meal_card(seq, emoji, title, macros_r, macros_m, ings, prep, tag_text="", tag_color=C_TM6):
    """
    Jeden posiłek z WYRAŹNYM podziałem wizualnym:
    - TYTUŁ: kolor terakota, pogrubiony, duży
    - MAKRO: stalowy błękit, mniejszy, osobna linia
    - SKŁADNIKI: leśna zieleń, osobna linia  
    - PRZYGOTOWANIE: ciemna zieleń, osobna linia
    """
    # TITLE LINE — terracotta, bold
    tag = f'<font color="{tag_color}"><b>◈ {tag_text}</b></font> ' if tag_text else ""
    title_html = f"<b>{seq}. {tag}{emoji} {title}</b>"
    
    # MACRO LINE — steel blue, smaller
    macro_html = (f"<b>Renata:</b> {macros_r['kcal']} kcal  ·  "
                  f"Białko {macros_r['protein']}g  ·  Tłuszcz {macros_r['fat']}g  ·  "
                  f"Węglowodany {macros_r['carbs']}g  ·  Błonnik {macros_r['fiber']}g<br/>"
                  f"<b>Rafał:</b> {macros_m['kcal']} kcal  ·  "
                  f"Białko {macros_m['protein']}g  ·  Tłuszcz {macros_m['fat']}g  ·  "
                  f"Węglowodany {macros_m['carbs']}g  ·  Błonnik {macros_m['fiber']}g")
    
    # INGREDIENTS — forest green
    ings_html = f"<b>🛒 Składniki:</b> {ings}"
    
    # PREPARATION — dark green
    prep_html = prep.replace("\n", "<br/>")
    
    # Build table — simpler, cleaner, no drawings
    data = [
        [Paragraph(f"{emoji} {title_html}", ps("MT", fontSize=10, leading=13, textColor=C_TITLE, fontName="ArialUni")), Paragraph(f"R: {macros_r['kcal']}kcal · M: {macros_m['kcal']}kcal", ps("MM", fontSize=7.5, leading=10, textColor=C_MACRO, alignment=TA_RIGHT))],
        [Paragraph(macro_html, ps("MM", fontSize=7.5, leading=10, textColor=C_MACRO)), ""],
        [Paragraph(f"<b>🛒 Składniki:</b> {ings}", ps("MI", fontSize=7, leading=8.5, textColor=C_ING)), ""],
        [Paragraph(f"<b>👨‍🍳 Przygotowanie:</b> {prep_html}", ps("MP", fontSize=7, leading=8.5, textColor=C_PREP)), ""],
    ]
    
    t = Table(data, colWidths=[W-55*mm, 55*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), HexColor("#FFF5F0")),     # title: ciepły brzoskwiniowy
        ('BACKGROUND', (0,1), (-1,1), HexColor("#F0F5F8")),     # macro
        ('BACKGROUND', (0,2), (-1,2), HexColor("#EFF5ED")),     # ingredients
        ('BACKGROUND', (0,3), (-1,3), WHITE),                   # prep
        ('BOX', (0,0), (-1,-1), 0.5, SAGE_L),
        ('SPAN', (1,1), (-1,1)),
        ('SPAN', (1,2), (-1,2)),
        ('SPAN', (1,3), (-1,3)),
        ('TOPPADDING', (0,0), (-1,-1), 3), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6), ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LINEBELOW', (0,0), (-1,0), 0.3, SAGE_L),
        ('LINEBELOW', (0,1), (-1,1), 0.3, SAGE_L),
        ('LINEBELOW', (0,2), (-1,2), 0.3, SAGE_L),
    ]))
    E.append(t)
    sp(12)  # WIĘCEJ ODSTĘPÓW MIĘDZY POSIŁKAMI

def batch_note(text):
    data = [[
        Paragraph(f"⏱️ <b>{text}</b>", ps("BN", fontSize=8, leading=10, textColor=C_WARN))
    ]]
    t = Table(data, colWidths=[W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), HexColor("#FEF6F0")),
        ('BOX', (0,0), (-1,-1), 0.4, HexColor("#F0D8C8")),
        ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8), ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    E.append(t)
    sp(2)

def protein_summary(text):
    data = [[
        Paragraph(f"✅ <b>{text}</b>", ps("PR", fontSize=8, textColor=C_TM6))
    ]]
    E.append(Table(data, colWidths=[W]).setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), HexColor("#F5F0F8")),
        ('BOX', (0,0), (-1,-1), 0.3, C_TM6),
        ('TOPPADDING', (0,0), (-1,-1), 3), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6), ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ])))

# ═════════════════════════════════════════════════════════════
#  DZIEŃ 1 — ŚRODA
# ═════════════════════════════════════════════════════════════
day_header("Środa", "07.10", "1 530", "2 000")

meal_card("1", "🌅",
    "Puszysty Omlet Serowy z Airfryera z Jogurtem Greckim",
    {"kcal": 440, "protein": 38, "fat": 26, "carbs": 8, "fiber": 0},
    {"kcal": 600, "protein": 50, "fat": 38, "carbs": 10, "fiber": 0},
    "Jajka (6 szt), ser żółty (60g), jogurt grecki (200g), szczypiorek, sól, pieprz",
    "Rozbij jajka do miski i roztrzep je widelcem. Dodaj starty ser i szczypiorek, wymieszaj. "
    "Wlej masę do silikonowej formy. Umieść w airfryerze. Ustaw temperaturę na <b>170°C</b> i czas na <b>12 minut</b>. "
    "Po upieczeniu omlet wyrośnie i będzie puszysty. Podawaj z jogurtem greckim. "
    "Porcje: Renata — 1/3 omleta + 100g jogurtu | Rafał — 2/3 omleta + 100g jogurtu.",
    "🔥 Air Fryer", C_TM6)

meal_card("2", "☀️",
    "Kurczak Curry z Ryżem Brązowym i Szpinakiem",
    {"kcal": 540, "protein": 46, "fat": 16, "carbs": 48, "fiber": 7},
    {"kcal": 740, "protein": 62, "fat": 24, "carbs": 68, "fiber": 9},
    "Pierś z kurczaka (400g), cebula, czosnek (2), pomidory krojone (puszka), mleko kokosowe (200ml), curry, kurkuma, kumin, ryż brązowy (200g), szpinak (100g), oliwa (30ml)",
    "⚙️ <b>Krok po kroku — TM6 Batch (obiad + kolacja jednocześnie!)</b><br/>"
    "<b>Krok 1:</b> Włóż cebulę i czosnek do misy. Zamknij pokrywę. Ustaw <b>5 sekund / obroty 5</b>.<br/>"
    "<b>Krok 2:</b> Dodaj oliwę. Ustaw <b>3 minuty / 120°C / obroty 1</b>.<br/>"
    "<b>Krok 3:</b> Dodaj pokrojonego w kostkę kurczaka. Ustaw <b>5 minut / 100°C / lewe obroty (Reverse) / obroty 1</b> — dzięki temu kurczak pozostanie w kawałkach, a nie zostanie rozdrobniony!<br/>"
    "<b>Krok 4:</b> Dodaj pomidory z puszki, mleko kokosowe i przyprawy (curry, kurkuma, kumin, sól, pieprz). "
    "Umieść koszyk Varoma na misie. Do Varomy włóż pokrojone w plastry tofu, cukinię i paprykę (to będzie kolacja!). "
    "Ustaw <b>20 minut / 100°C / obroty 1</b>.<br/>"
    "<b>Krok 5:</b> Po 15 minutach ostrożnie otwórz pokrywę Varomy. Dodaj szpinak do curry w misie. Zamknij i gotuj przez ostatnie 5 minut.<br/>"
    "<b>Krok 6:</b> W międzyczasie ugotuj ryż brązowy w garnku (wypłucz, zalej podwójną ilością wody, gotuj 30 minut na małym ogniu).<br/>"
    "<b>Podział na osoby:</b> Renata — 1/3 curry + 60g ryżu | Rafał — 2/3 curry + 100g ryżu. "
    "Kurkuma w curry pomaga stabilizować poziom cukru we krwi!",
    "⚙️ TM6 Batch", C_TM6)

batch_note("Obiad (curry w misie) i kolacja (tofu w Varomie) gotują się jednocześnie w 20 min!")

meal_card("3", "🌙",
    "Aromatyczne Tofu z Warzywami na Parze (z TM6)",
    {"kcal": 360, "protein": 32, "fat": 16, "carbs": 14, "fiber": 5},
    {"kcal": 480, "protein": 40, "fat": 22, "carbs": 20, "fiber": 6},
    "Tofu (300g), cukinia, papryka, szpinak (odłożony z curry), oliwa (15ml), sos sojowy, imbir, czosnek",
    "🧑‍🍳 <b>Przygotowany razem z obiadem w TM6!</b> "
    "Tofu z warzywami gotowało się w koszyku Varoma podczas przygotowywania obiadu (patrz przepis na Kurczak Curry — krok 4). "
    "Nie musisz go przygotowywać osobno — po zakończeniu programu TM6 wyciągnij Varomę i przełóż tofu z warzywami na talerz. "
    "Podawaj z odłożoną wcześniej porcją szpinaku z curry. "
    "Dla lepszego smaku możesz skropić gotowe danie sokiem z cytryny i posypać świeżym koperkiem. "
    "Porcje: Renata — 1/3 dania | Rafał — 2/3 dania.",
    "⚙️ TM6 Varoma", C_TM6)

protein_summary("Białko Renaty: 116g  •  Błonnik: 12g  •  Oszczędność czasu: 30 min dzięki batch!")
hr()

# ═════════════════════════════════════════════════════════════
#  DZIEŃ 2 — CZWARTEK
# ═════════════════════════════════════════════════════════════
day_header("Czwartek", "08.10", "1 580", "2 060")

meal_card("1", "🌅",
    "Kremowe Tofu Scramble z Kurkumą i Pikantną Nutą",
    {"kcal": 430, "protein": 34, "fat": 24, "carbs": 18, "fiber": 3},
    {"kcal": 590, "protein": 46, "fat": 34, "carbs": 28, "fiber": 4},
    "Tofu naturalne (400g), feta (100g), oliwa (20ml), kurkuma, kumin, chleb żytni (4 kromki), pomidor",
    "Wyjmij tofu z opakowania i odsącz je na ręczniku papierowym. "
    "Rozgnieć tofu widelcem w misce, aż uzyskasz konsystencję przypominającą jajecznicę. "
    "Dodaj kurkumę, kumin, sól i pieprz — dokładnie wymieszaj. "
    "Rozgrzej oliwę na patelni na średnim ogniu. "
    "Przełóż rozgniecione tofu na patelnię i smaż przez 5-6 minut, mieszając od czasu do czasu. "
    "Kurkuma nie tylko nadaje apetyczny złoty kolor, ale też działa przeciwzapalnie i pomaga stabilizować cukier! "
    "Pod koniec smażenia dodaj pokruszoną fetę i delikatnie wymieszaj. "
    "Podawaj z pomidorem pokrojonym w plasterki i chlebem żytnim. "
    "Porcje: Renata — 1/3 scramble + 1 kromka chleba | Rafał — 2/3 scramble + 3 kromki chleba.",
    "", SAGE)

meal_card("2", "☀️",
    "Chrupiący Kurczak z Batatami w Airfryer i Koperkową Surówką",
    {"kcal": 550, "protein": 44, "fat": 18, "carbs": 48, "fiber": 8},
    {"kcal": 790, "protein": 62, "fat": 28, "carbs": 68, "fiber": 10},
    "Pierś z kurczaka (400g), batat (300g), oliwa (25ml), papryka słodka, czosnek granulowany, kapusta pekińska (200g), marchewka, jogurt grecki (100g), koperek",
    "Pokrój pierś z kurczaka wzdłuż na dwa mniejsze filety, a następnie w poprzek na paski. "
    "Wymieszaj w misce oliwę z papryką słodką, czosnkiem granulowanym, solą i pieprzem. "
    "Dodaj paski kurczaka i dokładnie wymieszaj, aby każdy kawałek był pokryty przyprawami. "
    "Obierz batata i pokrój go w słupki grubości około 1 centymetra. Skrop oliwą i posól. "
    "Umieść kurczaka i bataty w koszu airfryera. Ustaw temperaturę na <b>180°C</b> i czas na <b>18 minut</b>. "
    "W połowie czasu (po 9 minutach) otwórz airfryer i przemieszaj składniki, aby równomiernie się upiekły. "
    "W międzyczasie przygotuj surówkę: poszatkuj kapustę pekińską, zetrzyj marchewkę na tarce o grubych oczkach. "
    "Wymieszaj warzywa z jogurtem greckim i posiekanym koperkiem. Dopraw solą i pieprzem. "
    "Surówka jest gotowa w 3 minuty — nie wymaga gotowania! "
    "Porcje: Renata — 120g kurczaka + 100g batata + surówka | Rafał — 200g kurczaka + 150g batata + surówka. "
    "Bataty mają niższy indeks glikemiczny niż zwykłe ziemniaki — lepsze dla stabilnego cukru!",
    "🔥 Air Fryer", C_TM6)

meal_card("3", "🌙",
    "Wieczorny Jogurt Grecki z Chrupką Nutą Orzechową",
    {"kcal": 420, "protein": 34, "fat": 22, "carbs": 22, "fiber": 5},
    {"kcal": 560, "protein": 40, "fat": 32, "carbs": 30, "fiber": 6},
    "Jogurt grecki 2% (500g), orzechy włoskie (40g), jabłka (2 szt.), cynamon, miód (opcjonalnie dla Rafała)",
    "To najprostszy posiłek w całym planie — nie wymaga gotowania! "
    "Przełóż jogurt grecki do miski. "
    "Umyj jabłka, pokrój je w kostkę (możesz zostawić skórkę — jest w niej najwięcej błonnika). "
    "Dodaj pokrojone jabłka i orzechy włoskie do jogurtu. Wymieszaj. "
    "Posyp całość cynamonem — cynamon naturalnie pomaga obniżać poziom cukru we krwi. "
    "Dla Rafała opcjonalnie można dodać łyżeczkę miodu. "
    "Porcje: Renata — 1/3 mieszanki | Rafał — 2/3 mieszanki. "
    "Całość zajmuje 5 minut i nie wymaga sprzątania — idealna kolacja po ciężkim dniu!",
    "⚡️ 5 minut", C_TM6)

protein_summary("Białko Renaty: 112g  •  Błonnik: 16g  •  Najwięcej błonnika — dobre trawienie!")
hr()

# ═════════════════════════════════════════════════════════════
#  DZIEŃ 3 — PIĄTEK
# ═════════════════════════════════════════════════════════════
day_header("Piątek", "09.10", "1 600", "2 050")

meal_card("1", "🌅",
    "Złota Jajecznica z Serem i Ziołami podana z Chlebem Żytnim",
    {"kcal": 470, "protein": 36, "fat": 28, "carbs": 14, "fiber": 2},
    {"kcal": 650, "protein": 48, "fat": 42, "carbs": 21, "fiber": 3},
    "Jajka (6 szt), ser żółty (60g), masło (15g), chleb żytni (5 kromek), szczypiorek, koperek",
    "Rozbij jajka do miski i roztrzep je widelcem. Dopraw solą i pieprzem. "
    "Zetrzyj ser żółty na tarce o drobnych oczkach. "
    "Roztop masło na patelni na małym ogniu. Uważaj, żeby masło nie zbrązowiało. "
    "Wlej roztrzepane jajka na patelnię. Smaż na małym ogniu, delikatnie mieszając drewnianą łyżką. "
    "Gdy jajka zaczynają się ścinać, dodaj starty ser i posiekany szczypiorek oraz koperek. "
    "Mieszaj jeszcze przez około 30 sekund, aż ser się rozpuści. "
    "Zdejmij patelnię z ognia — jajecznica będzie jeszcze ciepłem dochodzić. "
    "Podawaj na chlebie żytnim. Jajka z chlebem żytnim to posiłek o niskim indeksie glikemicznym — idealny dla Ciebie! "
    "Porcje: Renata — 2 jajka + 1 kromka chleba | Rafał — 4 jajka + 3 kromki chleba.",
    "", SAGE)

meal_card("2", "☀️",
    "Łosoś w Cytrynowej Mgiełce z Brokułami i Kaszą Gryczaną",
    {"kcal": 550, "protein": 44, "fat": 22, "carbs": 38, "fiber": 6},
    {"kcal": 770, "protein": 58, "fat": 32, "carbs": 54, "fiber": 8},
    "Łosoś świeży (400g), brokuły (200g), marchewka (2 szt.), kasza gryczana (200g), oliwa (20ml), cytryna (2 szt.), koperek",
    "⚙️ <b>Krok po kroku — TM6 Batch (obiad + kolacja jednocześnie!)</b><br/>"
    "<b>Krok 1:</b> Wlej 1 litr wody do misy TM6. Wsyp kaszę gryczaną do koszyka (umieść go w misie).<br/>"
    "<b>Krok 2:</b> Pokrój łososia na dwie porcje. Skrop sokiem z cytryny i posyp koperkiem oraz solą. "
    "Pokrój brokuły na różyczki, marchewkę w słupki.<br/>"
    "<b>Krok 3:</b> Załóż koszyk Varoma na misę. Na dolnym poziomie ułóż łososia, na górnym poziomie ułóż warzywa. "
    "Przykryj Varomę pokrywą.<br/>"
    "<b>Krok 4:</b> Ustaw TM6 na <b>25 minut / funkcja Varoma / obroty 1</b>.<br/>"
    "<b>Krok 5:</b> Po 20 minutach ostrożnie otwórz Varomę i wyjmij kaszę (jest już ugotowana). "
    "Kontynuuj gotowanie łososia i warzyw przez ostatnie 5 minut.<br/>"
    "<b>Podział na osoby:</b> Renata — 120g łososia + 100g brokułów + 80g kaszy | "
    "Rafał — 200g łososia + 100g brokułów + 120g kaszy. "
    "Łosoś z kaszą gryczaną to źródło kwasów omega-3 i wolnych węglowodanów — doskonałe dla stabilnego cukru!",
    "⚙️ TM6 Varoma + Batch", C_TM6)

batch_note("Łosoś i kasza gryczana gotują się jednocześnie w TM6 — oszczędzasz 20 minut! Sałatkę przygotuj w tym czasie.")

meal_card("3", "🌙",
    "Sałatka Greeka z Grilowanym Tofu i Awokado",
    {"kcal": 380, "protein": 32, "fat": 20, "carbs": 12, "fiber": 5},
    {"kcal": 520, "protein": 40, "fat": 30, "carbs": 16, "fiber": 6},
    "Tofu (200g), feta (100g), awokado, mix sałat, ogórek, pomidor, oliwa (15ml), oregano",
    "Pokrój tofu w plastry o grubości około 1 centymetra. Skrop oliwą i posyp oregano. "
    "Umieść tofu w koszu airfryera. Ustaw temperaturę na <b>180°C</b> i czas na <b>8 minut</b>. "
    "W międzyczasie umyj i pokrój warzywa: ogórka w półplasterki, pomidora w kostkę, "
    "awokado przekrój na pół, usuń pestkę i pokrój w plasterki. "
    "W dużej misce wymieszaj mix sałat z pokrojonymi warzywami. "
    "Gdy tofu jest gotowe, dodaj je do sałatki razem z pokruszoną fetą. "
    "Skrop całość pozostałą oliwą. "
    "Porcje: Renata — 1/3 sałatki | Rafał — 2/3 sałatki + dodatkowa kromka chleba.",
    "🔥 Air Fryer", C_TM6)

protein_summary("Białko Renaty: 112g  •  Błonnik: 13g  •  Wszystkie posiłki z niskim IG")
hr()

# ═════════════════════════════════════════════════════════════
#  SUMMARY
# ═════════════════════════════════════════════════════════════
E.append(Paragraph("📊 <b>Podsumowanie</b>", ps("SU2", fontSize=12, textColor=SAGE_D, spaceAfter=6, fontName="ArialUni")))

sum_data = [
    [Paragraph("<b>Dzień</b>", ps("SH2", fontSize=7, textColor=white, fontName="ArialUni")),
     Paragraph("<b>Renata kcal</b>", ps("SH2", fontSize=7, textColor=white, fontName="ArialUni")),
     Paragraph("<b>Białko R</b>", ps("SH2", fontSize=7, textColor=white, fontName="ArialUni")),
     Paragraph("<b>Błonnik R</b>", ps("SH2", fontSize=7, textColor=white, fontName="ArialUni")),
     Paragraph("<b>Rafał kcal</b>", ps("SH2", fontSize=7, textColor=white, fontName="ArialUni")),
     Paragraph("<b>TM6</b>", ps("SH2", fontSize=7, textColor=white, fontName="ArialUni"))],
    ["Środa", "1 530", "116g ✅", "12g ✅", "2 000", "Batch"],
    ["Czwartek", "1 580", "112g ✅", "16g ✅", "2 060", "Air Fryer"],
    ["Piątek", "1 600", "112g ✅", "13g ✅", "2 050", "Batch"],
]
st2 = TableStyle([
    ('BACKGROUND', (0,0), (-1,0), SAGE_D),
    ('GRID', (0,0), (-1,-1), 0.3, SAGE_L),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [PEACH, WHITE]),
    ('ALIGN', (1,0), (-1,-1), 'CENTER'),
    ('TOPPADDING', (0,0), (-1,-1), 2), ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('FONTSIZE', (0,1), (-1,-1), 7),
])
E.append(Table(sum_data, colWidths=[40*mm, 26*mm, 22*mm, 22*mm, 26*mm, 26*mm]).setStyle(st2))
sp(10)

# ─── FINAL TIPS ───
tips = [
    ("💧", "Pij min. 2L wody dziennie — szklanka przed każdym posiłkiem"),
    ("🥩", "Białko w każdym posiłku stabilizuje cukier i daje sytość"),
    ("🥦", "Połowa talerza to warzywa — błonnik spowalnia wchłanianie cukru"),
    ("🍞", "Tylko węglowodany złożone: chleb żytni, kasze, ryż brązowy, bataty"),
    ("⏱️", "TM6 batch: obiad + kolacja jednocześnie = 30 min oszczędności dziennie!"),
]
for icon, text in tips:
    data = [[
        Paragraph(f"<b>{icon} {text}</b>", ps("TP2", fontSize=7.5, leading=10, textColor=C_TEXT))
    ]]
    E.append(Table(data, colWidths=[W]).setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), HexColor("#F8FCF5")),
        ('BOX', (0,0), (-1,-1), 0.3, SAGE_L),
        ('TOPPADDING', (0,0), (-1,-1), 3), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 8), ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ])))
    sp(2)

sp(8)
hr()
E.append(Paragraph("🍳 <b>KuchennyPlan</b> — Renata &amp; Rafał  •  "
                   "github.com/renata89/kuchenny-plan  •  🌿 Gotujcie razem, jedzcie zdrowiej!",
                   ps("FT", fontSize=7, textColor=C_MUTED, alignment=TA_CENTER, spaceAfter=2)))
E.append(Paragraph("Renata: 1 600 kcal (cel białka: 120g+)  •  Rafał: 2 100 kcal",
                   ps("FT2", fontSize=7, textColor=C_MUTED, alignment=TA_CENTER)))

doc.build(E)
print(f"✅ PDF: {OUTPUT}")
