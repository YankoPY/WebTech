import * as fs from "fs";

import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../models";
import { NextResponse } from "next/server";

const fileName = "./user.json";

export async function POST(req: NextApiRequest) {
  if (req.method === "POST") {
    const data = loadUsers() || [];
    const user = (await (req as any).json()).user;
    const result = data.findIndex(
      (u) => u.email === user.email || u.username === user.username
    );
    if (result === -1) {
      data.push(user);
      fs.writeFileSync(fileName, JSON.stringify(data));
      return NextResponse.json(user);
    }
    return NextResponse.json({message: 'Username or email already exists'}, {status:400})  
  } else {
    return NextResponse.json({
      status: 405,
      data: `Method ${req.method} Not Allowed`,
    });
  }
}

function loadUsers() {
  if (!fs.existsSync(fileName)) {
    return [] as User[];
  }
  const users = JSON.parse(fs.readFileSync(fileName, "utf8")) as User[];
  return users;
}
