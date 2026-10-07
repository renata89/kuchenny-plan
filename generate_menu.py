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
import os, math
from reportlab.graphics.shapes import Drawing, Circle, String, Rect
from reportlab.graphics import renderPDF

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
    ("🥦 Warzywa", PEACH, ["Brokuły 1szt", "Ziemniaki 500g", "Batat 1szt (niski IG!)", "Cebula 2szt", "Czosnek 1 główka", "Pomidory świeże 3szt", "Szpinak świeży 150g", "Mix sałat 2op", "Ogórek świeży 2szt", "Rzodkiewka 2pęczki", "Papryka czerwona 1szt", "Cukinia 1szt", "Marchewka 2szt", "Pomidory krojone puszka 1szt"]),
    ("🧀 Nabiał & Jaja", BLUE, ["Jajka 15szt", "Ser żółty 200g", "Twaróg półtłusty 400g", "Feta 200g", "Masło kostka", "Jogurt grecki 2% 400g"]),
    ("🥩 Białko (kluczowe!)", LAV, ["Pierś z kurczaka 400g", "Łosoś świeży 400g (omega-3!)", "Tuńczyk w puszce 2szt", "Ciecierzyca puszka 1szt", "Mleko kokosowe puszka 1szt", "Tofu naturalne 500g"]),
    ("🍞 Produkty suche", PINK, ["Chleb żytni razowy 1 bochenek", "Kasza gryczana", "Ryż brązowy", "Oliwa z oliwek EV", "Orzechy włoskie", "Przyprawy: kurkuma, kumin, curry, papryka słodka, czosnek granulowany"]),
    ("🍎 Owoce (przekąski)", GOLD, ["Jabłka 3szt", "Cytryna 2szt", "Awokado 2szt"]),
]

shop_table = [[
    Paragraph("<b>Kategoria</b>", ps("SK", fontSize=8, textColor=white, fontName="ArialUni")),
    Paragraph("<b>Lista</b>", ps("SK", fontSize=8, textColor=white, fontName="ArialUni")),
]]
for cat, color, items in SHOP:
    shop_table.append([
        Paragraph(f"<b>{cat}</b>", ps("SC", fontSize=8, textColor=SAGE_D, fontName="ArialUni", spaceAfter=2)),
        Paragraph("&nbsp;&nbsp;".join([f"• {i}" for i in items]), ps("SI", fontSize=7, leading=9, textColor=C_TEXT)),
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
E.append(Table(shop_table, colWidths=[68*mm, 124*mm]).setStyle(st))
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
    
    # Build table rows — each type gets its own background tint
    # Add a colored left accent circle with emoji
    icon_d = Drawing(28, 28)
    icon_d.add(Circle(14, 14, 13, fillColor=HexColor("#E8DDD0"), strokeColor=None))
    icon_d.add(String(14, 11, emoji, fontName="ArialUni", fontSize=14, textAnchor="middle", fillColor=C_TEXT))
    
    data = [
        [icon_d, Paragraph(title_html, ps("MT", fontSize=10, leading=13, textColor=C_TITLE, fontName="ArialUni")), ""],
        [Paragraph(macro_html, ps("MM", fontSize=7.5, leading=10, textColor=C_MACRO)), ""],
        [Paragraph(ings_html, ps("MI", fontSize=7, leading=8.5, textColor=C_ING)), ""],
        [Paragraph(prep_html, ps("MP", fontSize=7, leading=8.5, textColor=C_PREP)), ""],
    ]
    
    # Different background for each row type
    t = Table(data, colWidths=[10*mm, W-24*mm, 14*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), HexColor("#FFF5F0")),     # title: ciepły brzoskwiniowy
        ('BACKGROUND', (0,1), (-1,1), HexColor("#F0F5F8")),     # macro
        ('BACKGROUND', (0,2), (-1,2), HexColor("#EFF5ED")),     # ingredients
        ('BACKGROUND', (0,3), (-1,3), WHITE),                   # prep
        ('BOX', (0,0), (-1,-1), 0.5, SAGE_L),
        ('SPAN', (1,0), (2,0)), ('SPAN', (1,1), (2,1)),
        ('SPAN', (1,2), (2,2)), ('SPAN', (1,3), (2,3)),
        ('VALIGN', (0,0), (0,0), 'MIDDLE'),  # icon centered in title row
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
#  DZIEŃ 1 — PONIEDZIAŁEK
# ═════════════════════════════════════════════════════════════
day_header("Poniedziałek", "06.10", "1 600", "2 050")

meal_card("1", "🌅",
    "Złota Jajecznica z Serem i Ziołami podana z Chlebem Żytnim",
    {"kcal": 470, "protein": 36, "fat": 28, "carbs": 14, "fiber": 2},
    {"kcal": 650, "protein": 48, "fat": 42, "carbs": 21, "fiber": 3},
    "Jajka (6 szt), ser żółty (60g), masło (15g), chleb żytni (5 kromek), szczypiorek, koperek, sól, pieprz",
    "Roztrzep jajka. Roztop masło na patelni, wlej jajka, smaż na małym ogniu mieszając. "
    "Dodaj starty ser i zioła. Porcje: Renata — 2 jajka + 1 kromka | Rafał — 4 jajka + 3 kromki. "
    "Jajka + chleb żytni = niski IG, brak skoku cukru!",
    "", SAGE)

meal_card("2", "☀️",
    "Łosoś w Cytrynowej Mgiełce z Brokułami i Kaszą Gryczaną",
    {"kcal": 550, "protein": 44, "fat": 22, "carbs": 38, "fiber": 6},
    {"kcal": 770, "protein": 58, "fat": 32, "carbs": 54, "fiber": 8},
    "Łosoś świeży (400g), brokuły (200g), marchewka (2 szt.), kasza gryczana (200g), oliwa (20ml), cytryna (2 szt.), koperek, sól himalajska",
    "⚙️ <b>TM6 — BATCH COOKING!</b> Wlej 1L wody. Do misy wsyp kaszę. "
    "W koszyku Varoma ułóż łososia (cytryna+koperek) i warzywa. "
    "<b>25 min / Varoma / obr. 1</b>. Kaszę wyjmij po 20 min. "
    "Porcje: R — 120g łososia + 100g brokułów + 80g kaszy | "
    "M — 200g łososia + 100g brokułów + 120g kaszy. "
    "Ryba + kasza = wolne węglowodany, stabilny cukier!",
    "⚙️ TM6 Varoma + Batch", C_TM6)

batch_note("OBIAD i KOLACJA gotują się jednocześnie w TM6! Oszczędzasz 30 minut dziennie.")

meal_card("3", "🌙",
    "Sałatka Greeka z Grilowanym Tofu i Awokado",
    {"kcal": 380, "protein": 32, "fat": 20, "carbs": 12, "fiber": 5},
    {"kcal": 520, "protein": 40, "fat": 30, "carbs": 16, "fiber": 6},
    "Tofu (200g), feta (100g), awokado, mix sałat, ogórek, pomidor, oliwa (15ml), oregano",
    "Tofu pokrój w plastry, skrop oliwą i posyp oregano — airfryer <b>180°C / 8 min</b>. "
    "Pokrój warzywa, wymieszaj z sałatą. Dodaj tofu i fetę. "
    "Porcje: R — 1/3 sałatki | M — 2/3 + kromka chleba. Lekka kolacja, bogata w białko.",
    "🔥 Air Fryer", C_TM6)

protein_summary("Białko Renaty: 112g  •  Błonnik: 13g  •  Wszystkie posiłki z niskim IG")
hr()

# ═════════════════════════════════════════════════════════════
#  DZIEŃ 2 — WTOREK
# ═════════════════════════════════════════════════════════════
day_header("Wtorek", "07.10", "1 530", "2 000")

meal_card("1", "🌅",
    "Puszysty Omlet Serowy z Airfryera z Jogurtem Greckim",
    {"kcal": 440, "protein": 38, "fat": 26, "carbs": 8, "fiber": 0},
    {"kcal": 600, "protein": 50, "fat": 38, "carbs": 10, "fiber": 0},
    "Jajka (6 szt), ser żółty (60g), jogurt grecki (200g), szczypiorek, sól, pieprz",
    "Roztrzep jajka z jogurtem greckim (dodaje białka!). Dodaj starty ser. "
    "Wlej do formy silikonowej. Airfryer <b>170°C / 12 min</b>. "
    "Porcje: R — 1/3 omleta + 100g jogurtu | M — 2/3 + 100g jogurtu.",
    "🔥 Air Fryer", C_TM6)

meal_card("2", "☀️",
    "Kurczak Curry z Ryżem Brązowym i Szpinakiem",
    {"kcal": 540, "protein": 46, "fat": 16, "carbs": 48, "fiber": 7},
    {"kcal": 740, "protein": 62, "fat": 24, "carbs": 68, "fiber": 9},
    "Pierś z kurczaka (400g), cebula, czosnek (2 ząbki), pomidory krojone (puszka), mleko kokosowe (200ml), curry, kurkuma, kumin, ryż brązowy (200g), szpinak (100g), oliwa (30ml)",
    "⚙️ <b>TM6 — BATCH: obiad w misie + kolacja w Varomie!</b><br/>"
    "<b>1.</b> Cebula+czosnek <b>5s / obr. 5</b>. Oliwa <b>3 min / 120°C / obr. 1</b>.<br/>"
    "<b>2.</b> Kurczak <b>5 min / 100°C / obr. 1</b>.<br/>"
    "<b>3.</b> Dodaj pomidory, mleko, przyprawy. Varoma z tofu+górą. <b>20 min / 100°C / obr. 1</b>.<br/>"
    "<b>4.</b> Po 15 min dodaj szpinak. Ryż ugotuj osobno.<br/>"
    "Porcje: R — 1/3 curry + 60g ryżu | M — 2/3 + 100g ryżu. Kurkuma stabilizuje cukier!",
    "⚙️ TM6 Batch", C_TM6)

batch_note("Obiad (curry w misie) i kolacja (tofu w Varomie) gotują się jednocześnie w 20 min!")

meal_card("3", "🌙",
    "Aromatyczne Tofu z Warzywami na Parze (z TM6)",
    {"kcal": 360, "protein": 32, "fat": 16, "carbs": 14, "fiber": 5},
    {"kcal": 480, "protein": 40, "fat": 22, "carbs": 20, "fiber": 6},
    "Tofu (300g), cukinia, papryka, szpinak (odłożony z curry), oliwa (15ml), sos sojowy, imbir, czosnek",
    "Tofu pokrój, zamarynuj w sosie sojowym+imbir+czosnek. Ułóż w koszyku Varoma z warzywami. "
    "Gotowało się jednocześnie z obiadem w TM6! Wyciągnij po 20 min. Podawaj z odłożonym szpinakiem z curry. "
    "Porcje: R — 1/3 | M — 2/3.",
    "⚙️ TM6 Varoma", C_TM6)

protein_summary("Białko Renaty: 116g  •  Błonnik: 12g  •  Oszczędność czasu: 30 min dzięki batch!")
hr()

# ═════════════════════════════════════════════════════════════
#  DZIEŃ 3 — ŚRODA
# ═════════════════════════════════════════════════════════════
day_header("Środa", "08.10", "1 580", "2 060")

meal_card("1", "🌅",
    "Kremowe Tofu Scramble z Kurkumą i Pikantną Nutą",
    {"kcal": 430, "protein": 34, "fat": 24, "carbs": 18, "fiber": 3},
    {"kcal": 590, "protein": 46, "fat": 34, "carbs": 28, "fiber": 4},
    "Tofu naturalne (400g), feta (100g), oliwa (20ml), kurkuma, kumin, chleb żytni (4 kromki), pomidor",
    "Rozgnieć tofu widelcem. Smaż na oliwie z kurkumą i kuminem 5-6 min. "
    "Kurkuma działa przeciwzapalnie i stabilizuje cukier! Dodaj fetę pod koniec. "
    "Porcje: R — 1/3 + 1 kromka | M — 2/3 + 3 kromki.",
    "", SAGE)

meal_card("2", "☀️",
    "Chrupiący Kurczak z Batatami w Airfryer i Koperkową Surówką",
    {"kcal": 550, "protein": 44, "fat": 18, "carbs": 48, "fiber": 8},
    {"kcal": 790, "protein": 62, "fat": 28, "carbs": 68, "fiber": 10},
    "Pierś z kurczaka (400g), batat (300g), oliwa (25ml), papryka słodka, czosnek granulowany, kapusta pekińska (200g), marchewka, jogurt grecki (100g), koperek",
    "Kurczaka pokrój, zamarynuj w oliwie i przyprawach. Batata w słupki. "
    "Airfryer <b>180°C / 18 min</b> (kurczak + bataty razem). "
    "Surówka: poszatkuj kapustę, zetrzyj marchewkę, wymieszaj z jogurtem i koperkiem (3 min). "
    "Porcje: R — 120g kurczaka + 100g batata | M — 200g kurczaka + 150g batata. "
    "Bataty = niższy IG niż ziemniaki!",
    "🔥 Air Fryer", C_TM6)

meal_card("3", "🌙",
    "Wieczorny Jogurt Grecki z Chrupką Nutą Orzechową",
    {"kcal": 420, "protein": 34, "fat": 22, "carbs": 22, "fiber": 5},
    {"kcal": 560, "protein": 40, "fat": 32, "carbs": 30, "fiber": 6},
    "Jogurt grecki 2% (500g), orzechy włoskie (40g), jabłka (2 szt.), cynamon, miód (opcjonalnie dla Rafała)",
    "Wymieszaj jogurt z pokrojonym jabłkiem i orzechami. Posyp cynamonem. "
    "Cynamon naturalnie obniża poziom cukru! 5 min, zero sprzątania. "
    "Porcje: R — 1/3 | M — 2/3.",
    "⚡️ 5 minut", C_TM6)

protein_summary("Białko Renaty: 112g  •  Błonnik: 16g  •  Najwięcej błonnika — dobre trawienie!")
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
    ["Poniedziałek", "1 600", "112g ✅", "13g ✅", "2 050", "Batch"],
    ["Wtorek", "1 530", "116g ✅", "12g ✅", "2 000", "Batch"],
    ["Środa", "1 580", "112g ✅", "16g ✅", "2 060", "Air Fryer"],
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
