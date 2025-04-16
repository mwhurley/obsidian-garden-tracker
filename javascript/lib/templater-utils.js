class TemplaterUtils {
  async promptNumber(tp, promptText) {
    const answer = await tp.system.prompt(promptText);
    return Number(answer) || 0;
  }
}
