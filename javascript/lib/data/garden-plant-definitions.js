/** Contains plant taxonomy definitions. */
class GardenPlantDefinitions {
  static #families = {
    "Alliums": { displayName: "🧅Alliums" },
    "Asparagus": { displayName: "🌱Asparagus" },
    "Asters": { displayName: "🌻Asters" },
    "Basellaceae": { displayName: "🥬Basellaceae" },
    "Brassicas": { displayName: "🥦Brassicas", rotateYears: 4 },
    "Citrus": { displayName: "🍊Citrus" },
    "Cucurbits": { displayName: "🍈Cucurbits", rotateYears: 4 },
    "Ginger": { displayName: "🫚Ginger" },
    "Goosefoot": { displayName: "🥬Goosefoot" },
    "Grasses": { displayName: "🌾Grasses" },
    "Legumes": { displayName: "🫘Legumes", rotateYears: 4 },
    "Mallows": { displayName: "🥬Mallows" },
    "Mint": { displayName: "🌿Mint" },
    "Morning Glories": { displayName: "💮Morning Glories", rotateYears: 4 },
    "Nightshades": { displayName: "🍅Nightshades", rotateYears: 4 },
    "Umbellifers": { displayName: "🥕Umbellifers" }
  };
  
  static #categories = {
    "Arugula": { displayName: "🥬Arugula", family: "Brassicas" },
    "Asparagus": { displayName: "🌱Asparagus", family: "Asparagus" },
    "Basil": { displayName: "🌿Basil", family: "Mint" },
    "Beans, Dry, Bush": { displayName: "🫘Beans, Dry, Bush", family: "Legumes" },
    "Beans, Dry, Pole": { displayName: "🫘Beans, Dry, Pole", family: "Legumes" },
    "Beans, Snap, Bush": { displayName: "🫘Beans, Snap, Bush", family: "Legumes" },
    "Beans, Snap, Pole": { displayName: "🫘Beans, Snap, Pole", family: "Legumes" },
    "Beets": { displayName: "🌱Beets", family: "Goosefoot" },
    "Bok Choy": { displayName: "🌱Bok Choy", family: "Brassicas" },
    "Broccoli": { displayName: "🥦Broccoli", family: "Brassicas" },
    "Brussels Sprouts": { displayName: "🌱Brussels Sprouts", family: "Brassicas" },
    "Cabbage": { displayName: "🥬Cabbage", family: "Brassicas" },
    "Carrots": { displayName: "🥕Carrots", family: "Umbellifers" },
    "Cauliflower": { displayName: "🥦Cauliflower", family: "Brassicas" },
    "Celery": { displayName: "🌱Celery", family: "Umbellifers" },
    "Chickpeas": { displayName: "🫘Chickpeas", family: "Legumes" },
    "Chicory": { displayName: "🥬Chicory", family: "Asters" },
    "Chives": { displayName: "🌱Chives", family: "Alliums" },
    "Cilantro": { displayName: "🌿Cilantro", family: "Umbellifers" },
    "Citrus": { displayName: "🍊Citrus", family: "Citrus" },
    "Collard": { displayName: "🥬Collard", family: "Brassicas" },
    "Corn": { displayName: "🌽Corn", family: "Grasses" },
    "Cowpeas": { displayName: "🫘Cowpeas", family: "Legumes" },
    "Cucamelon": { displayName: "🍈Cucamelon", family: "Cucurbits" },
    "Cucumbers, Pickling": { displayName: "🥒Cucumbers, Pickling", family: "Cucurbits" },
    "Cucumbers, Slicing": { displayName: "🥒Cucumbers, Slicing", family: "Cucurbits" },
    "Dill": { displayName: "🌿Dill", family: "Umbellifers" },
    "Eggplants": { displayName: "🍆Eggplants", family: "Nightshades" },
    "Endive": { displayName: "🥬Endive", family: "Asters" },
    "Fennel": { displayName: "🧄Fennel", family: "Umbellifers" },
    "Fenugreek": { displayName: "🌿Fenugreek", family: "Legumes" },
    "Garlic": { displayName: "🧄Garlic", family: "Alliums" },
    "Ginger": { displayName: "🫚Ginger", family: "Ginger" },
    "Gourds": { displayName: "🌱Gourds", family: "Cucurbits" },
    "Ground Cherries": { displayName: "🌱Ground Cherries", family: "Nightshades" },
    "Horseradish": { displayName: "🫚Horseradish", family: "Brassicas" },
    "Kale": { displayName: "🥬Kale", family: "Brassicas" },
    "Kohlrabi": { displayName: "🌱Kohlrabi", family: "Brassicas" },
    "Lavender": { displayName: "🪻Lavender", family: "Mint" },
    "Leeks": { displayName: "🌱Leeks", family: "Alliums" },
    "Lemon Balm": { displayName: "🌿Lemon Balm", family: "Mint" },
    "Lemongrass": { displayName: "🌾Lemongrass", family: "Grasses" },
    "Lettuce": { displayName: "🥬Lettuce", family: "Asters" },
    "Lovage": { displayName: "🌿Lovage", family: "Umbellifers" },
    "Marjoram": { displayName: "🌿Marjoram", family: "Mint" },
    "Melons": { displayName: "🍈Melons", family: "Cucurbits" },
    "Mint": { displayName: "🌿Mint", family: "Mint" },
    "Mustard": { displayName: "🥬Mustard", family: "Brassicas" },
    "Mustard Greens": { displayName: "🥬Mustard Greens", family: "Brassicas" },
    "Okra": { displayName: "🌱Okra", family: "Mallows" },
    "Onions": { displayName: "🧅Onions", family: "Alliums" },
    "Oregano": { displayName: "🌿Oregano", family: "Mint" },
    "Parsley": { displayName: "🌿Parsley", family: "Umbellifers" },
    "Parsnips": { displayName: "🌱Parsnips", family: "Umbellifers" },
    "Peanuts": { displayName: "🥜Peanuts", family: "Legumes" },
    "Peas, Shelling, Bush": { displayName: "🫛Peas, Shelling, Bush", family: "Legumes" },
    "Peas, Shelling, Pole": { displayName: "🫛Peas, Shelling, Pole", family: "Legumes" },
    "Peas, Snap, Bush": { displayName: "🫛Peas, Snap, Bush", family: "Legumes" },
    "Peas, Snap, Pole": { displayName: "🫛Peas, Snap, Pole", family: "Legumes" },
    "Peppers, Spicy": { displayName: "🌶️Peppers, Spicy", family: "Nightshades" },
    "Peppers, Sweet": { displayName: "🫑Peppers, Sweet", family: "Nightshades" },
    "Potatoes": { displayName: "🥔Potatoes", family: "Nightshades" },
    "Pumpkins": { displayName: "🎃Pumpkins", family: "Cucurbits" },
    "Radishes": { displayName: "🌱Radishes", family: "Brassicas" },
    "Rosemary": { displayName: "🌿Rosemary", family: "Mint" },
    "Rutabagas": { displayName: "🌱Rutabagas", family: "Brassicas" },
    "Sage": { displayName: "🌿Sage", family: "Mint" },
    "Scallions": { displayName: "🌱Scallions", family: "Alliums" },
    "Shallots": { displayName: "🧅Shallots", family: "Alliums" },
    "Soybeans": { displayName: "🫛Soybeans", family: "Legumes" },
    "Spinach": { displayName: "🥬Spinach", family: "Goosefoot" },
    "Spinach, Egyptian": { displayName: "🥬Spinach, Egyptian", family: "Mallows" },
    "Spinach, Malabar": { displayName: "🥬Spinach, Malabar", family: "Basellaceae" },
    "Squash, Summer": { displayName: "🌱Squash, Summer", family: "Cucurbits" },
    "Squash, Winter": { displayName: "🌱Squash, Winter", family: "Cucurbits" },
    "Sunflowers": { displayName: "🌻Sunflowers", family: "Asters" },
    "Sweet Potatoes": { displayName: "🍠Sweet Potatoes", family: "Morning Glories" },
    "Swiss Chard": { displayName: "🥬Swiss Chard", family: "Goosefoot" },
    "Tarragon": { displayName: "🌿Tarragon", family: "Mint" },
    "Thyme": { displayName: "🌿Thyme", family: "Mint" },
    "Tomatillos": { displayName: "🌱Tomatillos", family: "Nightshades" },
    "Tomatoes, Determinate": { displayName: "🍅Tomatoes, Determinate", family: "Nightshades" },
    "Tomatoes, Indeterminate": { displayName: "🍅Tomatoes, Indeterminate", family: "Nightshades" },
    "Turnips": { displayName: "🌱Turnips", family: "Brassicas" },
    "Watermelon": { displayName: "🍉Watermelon", family: "Cucurbits" }
  };
  
  /**
   * Identifier for a plant family.
   * @typedef {string} PlantFamilyId
   */
  /**
   * A plant family's details.
   * @typedef {Object.<string, *>} PlantFamilyDetails
   * @property {string} displayName - Name to use when displaying the family.
   * @property {number} rotateYears - How often (in years) this family can be planted in the same bed.
   */
  /**
   * Plant family map.
   * @typedef {Object.<PlantFamilyId, PlantFamilyDetails>} PlantFamilyMap
   */
  /**
   * Identifier for a plant category.
   * @typedef {string} PlantCategoryId
   */
  /**
   * A plant category's details.
   * @typedef {Object.<string, string>} PlantCategoryDetails
   * @property {string} displayName - Name to use when displaying the category.
   * @property {PlantFamilyId} family - The plant family this category belongs to.
   */
  /**
   * Plant category map.
   * @typedef {Object.<PlantCategoryId, PlantCategoryDetails>} PlantCategoryMap
   */
  
  /**
   * Plant families.
   * @type {PlantFamilyMap}
   */
  get families() { return GardenPlantDefinitions.#families; }
  
  /**
   * Plant categories.
   * @type {PlantCategoryMap}
   */
  get categories() { return GardenPlantDefinitions.#categories; }
  
  /**
   * Tag that idenitifies a garden plant, without #.
   * @type {string}
   */
  get plantTag() { return "gardenPlant"; }
}
