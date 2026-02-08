export interface JoinRequestPayload {
  fullName: string;
  email: string;
  major: string;
  year: string;
  motivation: string;
}

export async function createJoinRequest(data: JoinRequestPayload) {
  const res = await fetch("/api/v1/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to submit join request");
  }
  return res.json();
}
