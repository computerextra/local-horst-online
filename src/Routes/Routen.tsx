import { Route, Routes } from "react-router-dom";

export default function Routen() {
  return (
    <Routes>
      <Route
        path="/"
        element={<>HOME</>}
      />

      {/* Einkaufen */}
      <Route
        path="/Einkaufen/Auswahl"
        element={<>HOME</>}
      />
      <Route
        path="/Einkaufen/:id"
        element={<>HOME</>}
      />
      <Route
        path="/Einkaufen/Liste"
        element={<>HOME</>}
      />
      <Route
        path="/Einkaufen/Druck"
        element={<>HOME</>}
      />

      {/* Geburtstage */}
      <Route
        path="/Geburtstage"
        element={<>HOME</>}
      />

      {/* Archiv */}
      <Route
        path="/Archive"
        element={<>HOME</>}
      />

      {/* Fritz Garantie */}
      <Route
        path="/FritzBox"
        element={<>HOME</>}
      />

      {/* Info Mail an Kunde */}
      <Route
        path="/Info"
        element={<>HOME</>}
      />

      {/* Signaturen */}
      <Route
        path="/Signaturen"
        element={<>HOME</>}
      />
      <Route
        path="/Wiki"
        element={<>HOME</>}
      />

      {/* Telefonlisten */}
      {/* Mitarbeiter */}
      <Route
        path="/Telefonliste/Mitarbeiter"
        element={<>HOME</>}
      />
      <Route
        path="/Telefonliste/Mitarbeiter/:id"
        element={<>HOME</>}
      />

      {/* Lieferanten */}
      <Route
        path="/Telefonliste/Lieferanten"
        element={<>HOME</>}
      />
      <Route
        path="/Telefonliste/Lieferanten/:id"
        element={<>HOME</>}
      />

      {/* Ansprechpartner */}
      <Route
        path="/Telefonliste/Lieferanten/:LieferantenId/:id"
        element={<>HOME</>}
      />

      {/* Sage */}
      <Route
        path="/Telefonliste/Sage"
        element={<>HOME</>}
      />

      {/* Artikelnamen anhand von Artikelnummer */}
      <Route
        path="/Artikelname"
        element={<>HOME</>}
      />

      {/* Cashback */}
      <Route
        path="/Cashback"
        element={<>HOME</>}
      />

      {/* Kabelwand */}
      <Route
        path="/Kabelwand"
        element={<>HOME</>}
      />
      <Route
        path="/Kabelwand/:id"
        element={<>HOME</>}
      />
      <Route
        path="/Kabelwand/delete/:id"
        element={<>HOME</>}
      />

      {/* Zeitumrechnung */}
      <Route
        path="/Zeit"
        element={<>HOME</>}
      />

      {/* Heise RSS */}
      <Route
        path="/HeiseRSS"
        element={<>HOME</>}
      />

      {/* Warenlieferung */}
      <Route
        path="/Warenlieferung"
        element={<>HOME</>}
      />
    </Routes>
  );
}
