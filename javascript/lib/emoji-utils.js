/** Utilities for interacting with emojis. */
class EmojiUtils {
  /**
   * Gets the character in a string if it's an emoji.
   * @param {string} str - The string to check.
   * @param {?number} [charIndex=0] - Index of where to look, defaults to the first character.
   * @returns {?string} A string that is just the emoji, or null if the target character isn't one.
   */
  getCharIfEmoji(str, charIndex) {
    const firstChar = str.codePointAt(charIndex || 0);
    // In my vault, the only characters outside of basic ASCII will be emojis.
    // If you want proper Unicode support, you'll have to change this.
    // Detecting emojis is not straightforward so I took a simpler route for my needs.
    if (firstChar > 0x7F) return String.fromCodePoint(firstChar);
    return null;
  }
}
