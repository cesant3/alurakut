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
                <img src={item.imageUrl ? item.imageUrl : item.avatar_url} />
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
  const [comunidades, setComunidades] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const gitHubUser = "cesant3";
  const pessoasFavoritas = [
    {
      id: 1,
      title: "juunegreiros",
      html_url: "https://github.com/juunegreiros",
      imageUrl: "https://github.com/juunegreiros.png",
    },
    {
      id: 2,
      title: "omariosouto",
      html_url: "https://github.com/omariosouto",
      imageUrl: "https://github.com/omariosouto.png",
    },
    {
      id: 3,
      title: "peas",
      html_url: "https://github.com/peas",
      imageUrl: "https://github.com/peas.png",
    },
    {
      id: 4,
      title: "rafaballerini",
      html_url: "https://github.com/rafaballerini",
      imageUrl: "https://github.com/rafaballerini.png",
    },
    {
      id: 5,
      title: "marcobrunodev",
      html_url: "https://github.com/marcobrunodev",
      imageUrl: "https://github.com/marcobrunodev.png",
    },
    {
      id: 6,
      title: "felipefialho",
      html_url: "https://github.com/felipefialho",
      imageUrl: "https://github.com/felipefialho.png",
    },
    {
      id: 7,
      title: "felipefialho",
      html_url: "https://github.com/felipefialho",
      imageUrl: "https://github.com/felipefialho.png",
    },
  ];

  useEffect(() => {
    fetch("https://api.github.com/users/cesant3/followers")
      .then((res) => res.json())
      .then((respostaCompleta) => setSeguidores(respostaCompleta))
      .catch((e) => console.log(e));

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "7617e4fcde7df421811701c57bafb6",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id,
            title,
            creatorSlug,
            imageUrl
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((respostaCompleta) =>
        setComunidades(respostaCompleta.data.allCommunities)
      )
      .catch((e) => console.log(e));
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
                  title: dadosDoForm.get("title"),
                  imageUrl: dadosDoForm.get("image"),
                  creatorSlug: gitHubUser,
                };

                fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.register;
                  setComunidades([...comunidades, comunidade]);
                });
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
          <ProfileRelationsBox title="Comunidades" items={comunidades} />
          <ProfileRelationsBox title="Amigos" items={pessoasFavoritas} />
          <ProfileRelationsBox
            title="Pessoas da comunidade"
            items={seguidores}
          />
        </div>
      </MainGrid>
    </>
  );
}
