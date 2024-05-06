import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FloatingLabel,
  FormControl,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function LieferantenPage() {
  const Lieferanten = api.Lieferanten.getAll.useQuery();
  const Delete = api.Lieferanten.delete.useMutation();
  const DeleteAp = api.Ansprechpartner.delete.useMutation();
  const { isAdmin } = useAdmin();

  const [search, setSearch] = useState("");
  const [shown, setShown] = useState<
    typeof Lieferanten.data | undefined | null
  >(undefined);

  useEffect(() => {
    if (Lieferanten.data == null) return;
    if (search == "" || search.trim().length <= 0) {
      setShown(Lieferanten.data);
    } else {
      const tmp: typeof Lieferanten.data = [];
      Lieferanten.data.forEach((l) => {
        if (l.Firma.toLowerCase().includes(search.toLowerCase())) {
          tmp.push(l);
        }
        if (l.Kundennummer?.includes(search.toLowerCase())) {
          tmp.push(l);
        }
        if (l.Anschprechpartner.length > 0) {
          l.Anschprechpartner.forEach((a) => {
            if (a.Name.toLowerCase().includes(search.toLowerCase())) {
              tmp.push(l);
            }
            if (a.Mail?.toLowerCase().includes(search.toLowerCase())) {
              tmp.push(l);
            }
            if (a.Telefon?.toLowerCase().includes(search.toLowerCase())) {
              tmp.push(l);
            }
          });
        }
      });
      // Only Unique Values
      const unique: typeof Lieferanten.data = [];
      for (const i of tmp) {
        if (unique.indexOf(i) === -1) {
          unique.push(i);
        }
      }
      setShown(unique);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, Lieferanten.data]);

  const handleDelete = async (id: string) => {
    const Aps: string[] = [];
    const l = Lieferanten.data?.find((x) => x.id === id);
    if (l == null) return;
    l.Anschprechpartner.forEach((x) => {
      Aps.push(x.id);
    });

    for (const x of Aps) {
      await DeleteAp.mutateAsync({ id: x });
    }

    const res = await Delete.mutateAsync({ id: l.id });
    if (res) {
      location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Lieferanten | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fluid>
        <Container>
          <h1>Lieferanten</h1>
        </Container>
        {isAdmin && (
          <Link
            className={`btn btn-lg btn-outline-primary ${
              !isAdmin && "disabled"
            } mb-2`}
            href="/Telefonlisten/Lieferanten/new"
          >
            Neu
          </Link>
        )}
        {!Lieferanten.isLoading && Lieferanten.data && (
          <FloatingLabel
            className="mb-3"
            label="Suche nach Lieferanten, Kundennummer oder Ansprechpartner"
          >
            <FormControl
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suche nach Lieferanten, Kundennummer oder Ansprechpartner"
            />
          </FloatingLabel>
        )}
        {Lieferanten.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Firma</th>
                <th>KuNu</th>
                <th>APs</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown?.map((e) => (
                <tr key={e.id}>
                  <td>{e.Firma}</td>
                  <td>{e.Kundennummer}</td>
                  <td>
                    <Table hover striped>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Tel.</th>
                          <th>Mob.</th>
                          <th>Mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {e.Anschprechpartner?.map((a) => (
                          <tr key={a.id}>
                            <td>{a.Name}</td>
                            <td>
                              {a.Telefon ? (
                                <a href={"tel:" + a.Telefon}>{a.Telefon}</a>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              {a.Mobil ? (
                                <a href={"tel:" + a.Mobil}>{a.Mobil}</a>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              {a.Mail ? (
                                <a href={"mailto:" + a.Mail}>{a.Mail}</a>
                              ) : (
                                "-"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                  <td>
                    {e.Webseite ? (
                      <a target="_blank" href={e.Webseite}>
                        {e.Webseite}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <Dropdown>
                      <DropdownToggle variant="success" id="dropdown-actions">
                        Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        {isAdmin ? (
                          <>
                            <DropdownItem
                              as={Link}
                              href={"/Telefonlisten/Lieferanten/edit/" + e.id}
                            >
                              Bearbeiten
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem
                              href="#"
                              onClick={() => void handleDelete(e.id)}
                            >
                              Lieferant & Aps Löschen
                            </DropdownItem>
                          </>
                        ) : (
                          <DropdownItem href="#">Nur für Admin</DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
