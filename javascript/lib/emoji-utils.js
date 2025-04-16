class EmojiUtils {
  getCharIfEmoji(str, charIndex) {
    const firstChar = str.codePointAt(charIndex || 0);
    if (firstChar > 0x7F) return String.fromCodePoint(firstChar);
    return null;
  }
}
