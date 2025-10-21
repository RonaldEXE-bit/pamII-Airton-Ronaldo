
export async function POST(request: Request) {
    try {
      const { email, password } = await request.json();
  
      if (email === "Vilpandocesar8@gmail.com" && password === "123456") {
        return Response.json({
          email: email,
          name: "Ronaldo",
        });
      }
  
      return Response.json(
        { error: "Usuário e/ou senha incorreta." },
        { status: 401 } 
      );
  
    } catch (error) {
      return Response.json(
        { error: "Requisição inválida." },
        { status: 400 } 
      );
    }
  }