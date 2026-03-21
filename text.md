# Műszaki Dokumentáció: Renault Grand Scenic 1.9 dCi (ECU Javítás)


1. Jármű adatai
Típus: Renault Grand Scenic II (2007 körüli)
Motor: 1.9 dCi (130 LE), F9Q motorkód
Vezérlőegység (ECU): Bosch EDC16C36
Bosch szám: 0 281 013 907
Renault számok: 8200705747 / 8200705748
2. Hibajelenségek és Diagnózis
Jelenség: Meleg motornál alapjáraton dadogás, majd leállás. Pici gázadással életben tartható.
Kritikus hiba: Az üzemanyagnyomás (Rail Pressure) alapjáraton hirtelen beesik 300 bar-ról 100 bar alá (zuhanás).
Elektronikai hiba: Az ECU belső 5V-os referencia tápköre (Sensor Ref No. 2) zárlatos. Ez a zárlat melegedésre fokozódik.
3. Hibakódok és jelentésük
P0340: Vezérműtengely jeladó (Camshaft Sensor) hiba. (Oka: az 5V-os táp instabilitása a zárlat miatt).
P0530: Klíma nyomásérzékelő hiba. (Oka: a csatlakozó beázott, oxidált, ez okozta a zárlatot).
P0380: Izzítási kör hiba (Glow plugs). Nem akadályozza a hazautat.
P1435: EGR hiba (szoftveresen kiiktatva, de a hardveres zárlat miatt maradt fent).
4. ECU Pinout (G3 - nagy szürke csatlakozó)
G2 láb (3LU): Sensor Ref. 2 (+5V). Ez a zárlatos ág! (Ide tartozik: Gázpedál 2. pálya, Vezérműtengely jeladó, Klíma gomba, EGR visszajelzés).
H2 láb (3LR): Sensor Ref. 1 (+5V). Ez a "jó" ág. (Ide tartozik: Gázpedál 1. pálya, Rail nyomás szenzor, Turbónyomás/MAP szenzor).
5. Ideiglenes "Túlélő" megoldás (Bypass)
Gázpedál: A 3LU-ra (2-es láb a pedálnál) menő vezetéket elvágtad, és rákötötted a 3LR-ről (3-as láb) érkező tiszta 5V-ra.
Klíma: A klímahűtőnél lévő oxidált nyomásszenzort lehúztad. Ez stabilizálta a rendszert, a P0340 kód eltűnt, a leállás megszűnt.
6. Mechanikai állapot (Szervizlista)
Vezérlés: 80 000 km / 4 év (kíméletesen bírja a 2000 km-t, de otthon azonnal csere: Gates/Conti szett + Vízpumpa).
Termosztát: Rossz (nyitva maradt, max. 70°C). Csere otthon.
Motortartók: Alsó "kutyacsont" szakadt, felső hidraulikus kopott. (Javasolt: Hutchinson bakok).
7. Otthoni terv (Románia)
Bontott ECU: 0 281 013 907 (450 RON).
Műszer: Renolink 1.99 (120 RON).
Eljárás:
A) Új ECU virginizálása (Renolink "Virginizer" -> Clear Immo) + betétel után öntanulás.
B) EEPROM átforrasztása (régi ECU-ból az újba) – TV-szerelői rutinnal.
C) Régi ECU paneljavítása (G2 láb környéki SMD kondik/diódák ellenőrzése).
Aktuális állapot: Napi 100 km tesztüzem P0340 nélkül. Pénteken indulás Hollandiából haza (2000 km). Szerencsés utat!


Íme egy rendszerezett összefoglaló az eddigi diagnózisról és a megoldási tervről. Ezt elmentheted, mert minden fontos adatot tartalmaz a későbbi javításhoz.
1. Jármű adatai

* Típus: Renault Grand Scenic II (2007 körüli)
* Motor: 1.9 dCi (130 LE), F9Q motorkód
* Vezérlőegység (ECU): Bosch EDC16C36
* Bosch szám: 0 281 013 907
   * Renault számok: 8200705747 / 8200705748

2. Hibajelenségek és Diagnózis

* Jelenség: Meleg motornál alapjáraton dadogás, majd leállás. Pici gázadással életben tartható.
* Kritikus hiba: Az üzemanyagnyomás (Rail Pressure) alapjáraton hirtelen beesik 300 bar-ról 100 bar alá (zuhanás).
* Elektronikai hiba: Az ECU belső 5V-os referencia tápköre (Sensor Ref No. 2) zárlatos. Ez a zárlat melegedésre fokozódik.

3. Hibakódok és jelentésük

* P0340: Vezérműtengely jeladó (Camshaft Sensor) hiba. (Oka: az 5V-os táp instabilitása a zárlat miatt).
* P0530: Klíma nyomásérzékelő hiba. (Oka: a csatlakozó beázott, oxidált, ez okozta a zárlatot).
* P0380: Izzítási kör hiba (Glow plugs). Nem akadályozza a hazautat.
* P1435: EGR hiba (szoftveresen kiiktatva, de a hardveres zárlat miatt maradt fent).

4. ECU Pinout (G3 - nagy szürke csatlakozó)

* G2 láb (3LU): Sensor Ref. 2 (+5V). Ez a zárlatos ág! (Ide tartozik: Gázpedál 2. pálya, Vezérműtengely jeladó, Klíma gomba, EGR visszajelzés).
* H2 láb (3LR): Sensor Ref. 1 (+5V). Ez a "jó" ág. (Ide tartozik: Gázpedál 1. pálya, Rail nyomás szenzor, Turbónyomás/MAP szenzor).

5. Ideiglenes "Túlélő" megoldás (Bypass)

   1. Gázpedál: A 3LU-ra (2-es láb a pedálnál) menő vezetéket elvágtad, és rákötötted a 3LR-ről (3-as láb) érkező tiszta 5V-ra.
   2. Klíma: A klímahűtőnél lévő oxidált nyomásszenzort lehúztad. Ez stabilizálta a rendszert, a P0340 kód eltűnt, a leállás megszűnt.

6. Mechanikai állapot (Szervizlista)

* Vezérlés: 80 000 km / 4 év (kíméletesen bírja a 2000 km-t, de otthon azonnal csere: Gates/Conti szett + Vízpumpa).
* Termosztát: Rossz (nyitva maradt, max. 70°C). Csere otthon.
* Motortartók: Alsó "kutyacsont" szakadt, felső hidraulikus kopott. (Javasolt: Hutchinson bakok).

7. Otthoni terv (Románia)

* Bontott ECU: 0 281 013 907 (450 RON).
* Műszer: Renolink 1.99 (120 RON).
* Eljárás:
* A) Új ECU virginizálása (Renolink "Virginizer" -> Clear Immo) + betétel után öntanulás.
   * B) EEPROM átforrasztása (régi ECU-ból az újba) – TV-szerelői rutinnal.
   * C) Régi ECU paneljavítása (G2 láb környéki SMD kondik/diódák ellenőrzése).

Aktuális állapot: Napi 100 km tesztüzem P0340 nélkül. Pénteken indulás Hollandiából haza (2000 km). Szerencsés utat!


Műszaki Dokumentáció: Renault Grand Scenic 1.9 dCi (ECU Javítás)1. Vezérlőegység (ECU) Specifikációk

* Típus: Bosch EDC16C36 (CP33)
* Bosch szám: 0 281 013 907
* Renault azonosítók: 8200705747 / 8200705748
* EEPROM Chip: ST95160 vagy ST95320 (8-tűs SPI buszos Serial Flash).
* Megjegyzés: Itt tárolódik az Immobilizer (indításgátló) kód és a konfigurációs adatok.
* Processzor/Flash: Motorola MPC5xx (itt van a motorvezérlő szoftver, az "EGR-off" térképek).

2. Pinout és Tápellátási Anomália (G3 - Nagy szürke csatlakozó)

* G2 láb (3LU): Sensor Reference 2 (+5V). ZÁRLATOS ÁG!
* Érintett szenzorok: Gázpedál (2. pálya), Vezérműtengely jeladó, Klíma nyomásszenzor.
* H2 láb (3LR): Sensor Reference 1 (+5V). STABIL ÁG.
* Érintett szenzorok: Gázpedál (1. pálya), Üzemanyagnyomás (Rail), Turbónyomás (MAP).
* Ideiglenes megoldás: A 3LU vezetéket elvágva a gázpedál 5V-os tápját a 3LR ágról pótoltad (bypass).

3. Hibakódok és Állapot

* P0340: Vezérműtengely jeladó (eltűnt a klíma-lehúzás után!).
* P0530: Klíma nyomásérzékelő (lehúzva, szakadást jelez, de nem zárolja az 5V-ot).
* P0380: Izzítógyertya hiba (folyamatosan jelen van, nem kritikus).
* P1435: EGR hiba (szoftveresen kiiktatva).

4. Mechanikai Lista (Hazaút után)

* Vezérlés: 80 000 km / 4 év (Gates/Contitech szett + Vízpumpa csere esedékes).
* Bakok: Alsó billenésgátló ("kutyacsont") és felső hidraulikus bak csere (Hutchinson javasolt).
* Termosztát: Rossz, nyitva maradt (70°C).

5. Szoftveres/Hardveres helyreállítási terv (Románia)

   1. EEPROM Olvasás: A régi ECU-ból a 95160/95320 chip tartalmát 8-pines csipesszel (pl. CH341A vagy hasonló programozóval) kiolvasod.
   2. EEPROM Írás: A kiolvasott tartalmat (.bin vagy .hex) beírod az új (bontott) ECU EEPROM-jába.
   3. Renolink: Ha az EEPROM klónozás után bármi szoftveres eltérés lenne, a Renolink 1.99 kábellel elvégzed a végső konfigurációt (pl. kézifék aktiválása, hibatörlés).
   4. Hardver javítás: A régi ECU panelén a G2 láb (3LU) mentén megkeresed a zárlatos SMD kondenzátort vagy diódát, és eltávolítod.

------------------------------
Aktuális státusz: A klímaszenzor lehúzásával a P0340 megszűnt, a 100 bar-os nyomásesés megállt. Az autó alkalmas a pénteki 2000 km-es útra.
Sok sikert a heti 500 km-es teszthez és biztonságos hazautat pénteken! Ezt a listát mentsd el, ez a Scenic "orvosi kórlapja".

