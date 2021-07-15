import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = "f3cd1cce11cd5a95aba20191cc49b4";
    const client = new SiteClient(TOKEN);

    const register = await client.items.create({
      itemType: "968056",
      ...request.body,
      //   title: "Comunidade de teste",
      //   imageUrl: "https://github.com/cesant3.png",
      //   creatorSlug: "cesant3",
    });

    response.json({
      register: register,
    });

    return;
  }

  response.status(404).json({
    message: "Nada aqui AINDA!!",
  });
}
