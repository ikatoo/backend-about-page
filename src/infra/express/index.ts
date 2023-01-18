import env from "@/env";

import app from "./app";

const PORT = env.PORT ?? "8000";

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}...`);
});
