const { analyzeEntitiesFromText } = require('./gcpApi');

(async () => {
  const text = `
    The Divine Comedy is composed of 14,233 lines that are divided into three cantiche (singular cantica) – Inferno (Hell), Purgatorio (Purgatory), and Paradiso (Paradise) – each consisting of 33 cantos (Italian plural canti). An initial canto, serving as an introduction to the poem and generally considered to be part of the first cantica, brings the total number of cantos to 100. It is generally accepted, however, that the first two cantos serve as a unitary prologue to the entire epic, and that the opening two cantos of each cantica serve as prologues to each of the three cantiche.[10][11][12]

    The number three is prominent in the work (alluding to the Trinity), represented in part by the number of cantiche and their lengths. Additionally, the verse scheme used, terza rima, is hendecasyllabic (lines of eleven syllables), with the lines composing tercets according to the rhyme scheme aba, bcb, cdc, ded, ....[13]
    
    Written in the first person, the poem tells of Dante's journey through the three realms of the dead, lasting from the night before Good Friday to the Wednesday after Easter in the spring of 1300. The Roman poet Virgil guides him through Hell and Purgatory; Beatrice, Dante's ideal woman, guides him through Heaven. Beatrice was a Florentine woman he had met in childhood and admired from afar in the mode of the then-fashionable courtly love tradition, which is highlighted in Dante's earlier work La Vita Nuova.[14]
    
    The structure of the three realms follows a common numerical pattern of 9 plus 1, for a total of 10: 9 circles of the Inferno, followed by Lucifer contained at its bottom; 9 rings of Mount Purgatory, followed by the Garden of Eden crowning its summit; and the 9 celestial bodies of Paradiso, followed by the Empyrean containing the very essence of God. Within each group of 9, 7 elements correspond to a specific moral scheme, subdivided into three subcategories, while 2 others of greater particularity are added to total nine. For example, the seven deadly sins of the Catholic Church that are cleansed in Purgatory are joined by special realms for the late repentant and the excommunicated by the church. The core seven sins within Purgatory correspond to a moral scheme of love perverted, subdivided into three groups corresponding to excessive love (Lust, Gluttony, Greed), deficient love (Sloth), and malicious love (Wrath, Envy, Pride).[15]
    
    In central Italy's political struggle between Guelphs and Ghibellines, Dante was part of the Guelphs, who in general favored the Papacy over the Holy Roman Emperor. Florence's Guelphs split into factions around 1300 – the White Guelphs and the Black Guelphs. Dante was among the White Guelphs who were exiled in 1302 by the Lord-Mayor Cante de' Gabrielli di Gubbio, after troops under Charles of Valois entered the city, at the request of Pope Boniface VIII, who supported the Black Guelphs. This exile, which lasted the rest of Dante's life, shows its influence in many parts of the Comedy, from prophecies of Dante's exile to Dante's views of politics, to the eternal damnation of some of his opponents.[16]
    
    The last word in each of the three cantiche is stelle ("stars").
  `;
  try {
    const result = await analyzeEntitiesFromText(text);
    console.log(result);
  } catch(error) {
    console.log(error.message);
  }
})();