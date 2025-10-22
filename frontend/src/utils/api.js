export const transcribeAudio = async (file, language = "en", user_id = "guest") => {
  const form = new FormData();
  form.append("file", file);
  form.append("language", language);
  form.append("user_id", user_id);

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transcribe`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!res.ok) {
      // Include backend error message
      throw new Error(data.error || "Failed to transcribe audio");
    }

    return data;

  } catch (err) {
    console.error("[API ERROR]", err);
    throw err; // Let App.jsx catch and display
  }
};

export const getTranscripts = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transcripts`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("[API ERROR]", err);
    return [];
  }
};



// export const checkBackend = async () => {
//   try {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/transcripts`);
//     if (!res.ok) throw new Error();
//     return "Backend running ✅";
//   } catch {
//     return "Backend offline ❌";
//   }
// };

