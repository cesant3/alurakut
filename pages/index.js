import React, { useEffect, useState } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AluraCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelantions";

function ProfileSideBar({ gitHubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${gitHubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a href={`https://github.com/${gitHubUser}`} className="boxLink">
          @{gitHubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>

      <ul>
        {items.slice(0, 6).map((item) => {
          return (
            <li key={item.id}>
              <a href={item.html_url} key={item.id}>
                <img src={item.image ? item.image : item.avatar_url} />
                <span>{item.title ? item.title : item.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = useState([
    {
      id: "1651698453198",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);
  const [seguidores, setSeguidores] = useState([]);
  const gitHubUser = "cesant3";
  // const pessoasFavoritas = [
  //   "juunegreiros",
  //   "omariosouto",
  //   "peas",
  //   "rafaballerini",
  //   "marcobrunodev",
  //   "felipefialho",
  //   "felipefialho",
  // ];

  useEffect(() => {
    fetch("https://api.github.com/users/cesant3/followers")
      .then((res) => {
        return res.json();
      })
      .then((respostaCompleta) => {
        console.log(respostaCompleta);
        setSeguidores(respostaCompleta);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar gitHubUser={gitHubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)!</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCreateCommunity(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get("title"),
                  image: dadosDoForm.get("image"),
                };
                setComunidades([...comunidades, comunidade]);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox 
            title="Comunidades" 
            items={comunidades} 
          />
          <ProfileRelationsBox
            title="Pessoas da comunidade"
            items={seguidores}
          />
        </div>
      </MainGrid>
    </>
  );
}
