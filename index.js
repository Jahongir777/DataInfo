const {Telegraf, session, Scenes: {BaseScene, Stage}, Markup} = require('telegraf');
require('dotenv').config();


const bot = new Telegraf(process.env.BOT_TOKEN);
const chatId = process.env.CHATID;



bot.command('start', async (ctx) => {
  return await ctx.reply(`Assalom alaykum ${ctx.message.from.first_name}!  Pastdan kerakli b\'limni tanlang! `, Markup
    .keyboard([
      ['🔹 DATA learning centre 🔸', '📋 O\'quv kurslar'],
      ['☎️ Aloqa', '📍 Location'],
      ['📝 Registratsiya']
    ])
    .resize()
  )
})

//registratsiya
//
const nameScene = new BaseScene("nameScene");
nameScene.enter((ctx) => ctx.reply("Ismingiz va familiyangiz"));
nameScene.on("text", (ctx) => {
  ctx.session.name = ctx.message.text;
  return ctx.scene.enter("ageScene", { name: ctx.message.text });
});

const ageScene = new BaseScene("ageScene");
ageScene.enter((ctx) => ctx.reply("Yoshingiz nechida?"));
ageScene.on("text", (ctx) => {
  ctx.session.age = ctx.message.text;
  return ctx.scene.enter("courseScene", { age: ctx.message.text });
});

const courseScene = new BaseScene("courseScene");
courseScene.enter((ctx) =>
  ctx.reply(
    "Qaysi yo'nalishda o'qishni hohlaysiz?\n (Misol uchun: Web dasturlash, Android dasturlash, Video mantaj, Kompyuter savodhonligi va h.k)"
  )
);
courseScene.on("text", (ctx) => {
  ctx.session.course = ctx.message.text;
  return ctx.scene.enter("infoScene", { course: ctx.message.text });
});

const infoScene = new BaseScene("infoScene");
infoScene.enter((ctx) =>
  ctx.reply(
    "Bu yo'nalish bo'yicha ma'lumotingiz qanday?\n(Misol uchun: Umuman bilmayman, o'rtacha, yaxshi bilaman"
  )
);
infoScene.on("text", (ctx) => {
  ctx.session.info = ctx.message.text;

  ctx.reply(
    `Anketa o\'rnatildi jo'natishni tasdiqlaysizmi?\n\n👨‍🎓 Ismi: ${ctx.session?.name}\n🧍 Yoshi: ${ctx.session?.age}\n💻 Tanlangan yo\'nalish: ${ctx.session?.course}\n📚 Ma\'lumoti: ${ctx.session?.info}`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Anketani jo'natish", callback_data: "send" }],
        ],
      },
    }
  );
  return ctx.scene.leave();
});

const stage = new Stage([nameScene, ageScene, courseScene, infoScene]);
stage.hears("exit", (ctx) => ctx.scene.leave());

bot.use(session());
bot.use(stage.middleware());
bot.command("/start", (ctx) => {
  return ctx.reply(
    `Assalom alaykum ${ctx.message.from.first_name}!`,
    Markup.keyboard([["📝 Registratsiya"]]).resize()
  );
});
bot.hears("📝 Registratsiya", (ctx) => ctx.scene.enter("nameScene"));
bot.command("/send", (ctx) =>
  ctx.telegram.sendMessage(
    chatId,
    `Ism: ${ctx.session?.name}\nYoshi: ${ctx.session?.age}\nTanlangan yo\'nalish: ${ctx.session?.course}\nMa\'lumoti: ${ctx.session?.info}`
  )
);
bot.action("send", (ctx) => {
    ctx.answerCbQuery()
  return ctx.telegram.sendMessage(
    chatId,
    `Yangi o'quvchi\n\n👨‍🎓 Ismi: ${ctx.session?.name}\n🧍 Yoshi: ${ctx.session?.age}\n💻 Tanlangan yo\'nalish: ${ctx.session?.course}\n📚 Ma\'lumoti: ${ctx.session?.info}`
  );
});



//registratsiya

  bot.hears('📋 O\'quv kurslar', async (ctx) => {
    return await ctx.reply('📋 O\'quv kurslar', Markup
      .keyboard([
        ['📐 Arxitektura va dizayn', '🏗 Arxitektura SMETA'],
        ['💻 Web dasturlash', '🎥 Video montaj'],
        ['📱 Android dasturlash', '💻 Kompyuter Savodxonligi'],
        ['🔝 Main Menu']
      ])
      .resize()
    )
  })



  bot.hears('📐 Arxitektura va dizayn', async (ctx) => {
    return await ctx.reply('<b>"Arxitektura va dizayn" kurslari. 3 oyda noldan professionalgacha!</b>\n\n<b>1.Kurs kimlar uchun:</b>\n🔹Mazkur sohada ishlamoqchi bo\'lganlar;\n🔹Dizayn studiya xodimlari;\n🔹Shu yo\'nalishida universitetga kirmoqchi bo\'lganlar;\n🔹3D model yaratishni o\'rganmoqchi bo\'lganlar;\n\n <b>2.Darsliklar dasturi:</b> \n 🔸AutoCAD\n🔸3Ds MAX\n🔸Lumion\n\n<b>3.Kurs haqida</b>\n• Davomiyligi: 3 oy;\n• Dars vaqti: Du,Cho,Ju kunlari, soat 11:00-13:00 gacha;\n• 10 nafar qatnashuvchi qabul qilinadi;\n• Har bir o\'quvchiga kompyuter beriladi;\n• Kurs yakunida sertifikat beriladi;\n\n<b>4.Kurs narxi haqida</b>\nKurs narxi 30% chegirma bilan.\n750 000 ming so\'m\n\n<b>⚠️ DIQQAT!</b>  Kurs davomida talabalar haqiqiy Arxitektor sifatida ishlaydilar: AutoCAD dasturida maket yaratish, 3Ds MAX bilan ishlash, dekorativ elementlar bilan inshoat yaratish, animatsiya bilan ishlash, modelni optimallashtirish va oxirida — tugallangan loyihalarni taqdimot qilish. <a href="https://form.jotform.com/201725058712451">Kursda o\'qish uchun hoziroq online anketa to\'diring yoki adminstartorlar bilan bog\'laning!</a>\n\n📞 Tel: +99899-759-88-86\n\n👩🏻‍💻 @Data_Administrator\n\n➡️ Moʻljal: Urganch, Darital 2-qavat\n\n<b>💻"DATA" - innovatsion texnologiyalar ta\'lim markazi</b>\n\n<a href="http://t.me/data_learning_centre">Telegram</a> | <a href="http://instagram.com/data_learning_centre">Instagram</a>  |  <a href="http://youtube.com/data_learning_centre">YouTube</a>',
    
    {parse_mode: 'html', 
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [ 
        [{text: 'Kurs narxi haqida', callback_data: 'price'}],
      [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1481'}]
    ]
  }})})

  bot.action('price', async (ctx) => {
    return  await ctx.answerCbQuery('"Arxitektura va dizayn" kurslari. 3 oyda 0 dan professionalgacha!\nKurs narxi 30% chegirma bilan 750 000 ming so\'m.', {show_alert: true})
  })



bot.hears('🏗 Arxitektura SMETA', async (ctx) => {
  return await ctx.reply('<b>XORAZMDA ILK MAROTABA!</b>\n\n<b>Siz yetuk smeta mutaxassisi bo\'lishni xohlaysizmi? Qurilish, ta\'mirlash va rekonstruksiya yo\'nalishlarida smeta hisob-kitob malakasini o\'zlashtirmoqchimisiz?</b>\n\n<b>"DATA"</b> o\'quv markazida <b>\"Qurilishda smeta ishi\"</b> yo\'nalishi bo\'yicha yangi yo\'nalish.\n\n🟢 <b>\"Qurilishda smeta ishi kimlar uchun?:</b>\n\n➡️ Loyiha tashkilotlari xodimlari;\n➡️ Qurilish tashkilotlari xodimlari;\n➡️ Smeta ishlashni o\'rganishni xohlagan ko\'ngillilar;\n➡️ Zamonaviy va talab yuqori kasb egasi bo\'lishni istaganlar.\n\n🟢 <b>Darsda nimalarni bilib olasiz?:</b>\n\n➡️ Smeta ishining ahamiyati va tarkibi;\n➡️ Qurilish sohasida smeta hujjatini tayyorlash texnologiyasi;\n➡️ “Qurqiymatasos-2005” dasturni amalyotda qo\'llanilishi;\n➡️ Bozor iqtisodiyoti sharoitida qurilish materiyallari, ish haqi va moshina mexanizimlar harajatlarini o\'zgaruvchanligi;\n➡️ Yakuniy smeta hujjatini taxt qilish;\n➡️ 3 oylik kursni tugatgach qanday joylarda ishlash mumkinligini;\n\n🏃🏻‍♂️Shoshiling, bunday imkoniyatni o\'tkazib yubormang!😉\n\n<b>Ochiq darslarda ishtirok etish uchun administrator bilan bog\'laning!</b>\n\n📞 Tel: +99899-759-88-86\n\n 🚩 <b>Moʻljal:</b> Urganch, Darital, 2-qavat\n\n👨🏻‍💻<b>\"DATA\"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html',
  disable_web_page_preview: true, 
     reply_markup: {
      inline_keyboard: [
        [{text: 'Kurs narxi haqida', callback_data: 'price1'}],
      [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1509'}]
    ]
  }
  
})})

bot.action('price1', async (ctx) => {
  return  await ctx.answerCbQuery('"DATA" o\'quv markazida "Qurilishda smeta ishi" yo\'nalishi bo\'yicha yangi yo\'nalish.\nKurs narxi chegirma bilan 950 000 ming so\'m.', {show_alert: true})
})



bot.hears('💻 Web dasturlash', async (ctx) => {
  return await ctx.reply('<b>O\'z kelajagingizni IT soha bilan bog\'lang. Buning uchun "Web dasturlash" kursida o\'qing!🤓</b>\n\n<b>Qisqach ma\'lumot</b>\n • Darslar noldan boshlab o\'rgatiladi;\n• Minimal yosh chegarasi 14 yosh;\n• Kurs davomiyligi 3 oy;\n• Darslar haftada 3 kun, 4 soatdan;\n• Guruhga 9 nafar qatnashuvchi qabul qilinadi;\n• Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\n• Har bir guruhga 2 ta o\qituvchi mentorlik qiladi;\n• Kurs yakunida sertifikat beriladi;\n\n<b>Darsliklar dasturi:</b>\n<b>▪️ (Frontend)| HTML, CSS3, JS, Bootstrap</b>\n<b>▪️ (Backend)| PHP, MySQL</b>\n<b>▪️ DevOps</b>(Domain, Server, ishchi muhit konfiguratsiyasi ya’ni dasturlarni o’rnatish ulardan foydalanib kod yozish hamda local testlash jarayonlari, …)\n\n<b>🧑🏻‍💻 Kurs davomida talabalar haqiqiy programmist sifatida ishlaydilar:</b>Sahifalarni yaratish, Photoshop tartiblari bilan ishlash, dekorativ elementlar bilan saytni yaratish, animatsiya bilan ishlash, kodni optimallashtirish va oxirida — tugallangan loyihalarni internetda nashr qilish uchun tayyorlash.\n\n<b>O\'qitvichilar</b>\n<a href="https://t.me/data_learning_centre/1540">Alisher Xo\'janiyazov</a>\n<a href="https://t.me/data_learning_centre/1222">Kamron Fozilov</a>\n\n📞 <b>Tel:</b> +99899-759-88-86\n\n 🚩 <b>Moʻljal:</b> Urganch, Darital, 2-qavat\n\n👨🏻‍💻<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price2'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1540'}]
  ]
}})})

bot.action('price2', async (ctx) => {
  return  await ctx.answerCbQuery(' O\'z kelajagingizni IT soha bilan bog\'lang. Buning uchun "Web dasturlash" kursida o\'qing.\nKurs narxi chegirma bilan 650 000 ming so\'m.', {show_alert: true})
})


  
bot.hears('🎥 Video montaj', async (ctx) => {
  return await ctx.reply('<b>🌎 O\'rgan va hayratda qoldir!🤩</b>\n\n<code>🔴 Bugungi kunda televideniye, kino sanoati, reklama, "Youtube" hamda Instagram bloglari, onlayn ta\'lim va yana boshqa turdagi sohalarni videolavhalarsiz tasavvur qilib bo\'lmaydi.Albatta bu yo\'nalishda videolarni kreativ montaj qilib hammani hayratga solishingiz va proffessional mutaxassis sifatida katta mablag\' ishlashingiz mumkin!</code>\n\n✅Buning uchun esa video montajni o\'rganishingiz kerak!\nAgar siz bu sohasiga qiziqsangiz "Video montaj" kurslarimiz aynan siz uchun!\n\n• Boshlang\'ich bilim talab etilmaydi\n• Minimal yosh chegarasi 14 yosh;\n• Kurs davomiyligi 3 oy;\n• Darslar haftada 3 kun, 4 soatdan;\n• Guruhga 9 nafar qatnashuvchi qabul qilinadi;\n• Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\n• Kurs yakunida sertifikat beriladi;\n\n🔵Kurs davomida quyidag dasturlarda ishlashni o\'rganasiz:\n\n<b>🔘 Adobe Premiere Pro</b>\n<b>🔘 Adobe After Effects</b>\n<b>🔘 Cinema 4D</b>\n\n🧑‍💻Darslarni <b>“STRONG EFFECT”</b> o\'quv sistemasi asoschisi. Sohada 10 yillik tajribaga ega, oliy ma\'lumotli, <b>ZO\'R TV</b>, <b>O\'zbekkino</b> agentliklarida faoliyat yuritgan  <a href=\"https://t.me/data_learning_centre/1473\">O\'tkirbek Karimov</a> olib boradi.\n\n<a href="https://t.me/Data_Administrator">🧑🏻‍💼Administratorlar bilan aloqa</a>\n\n📞 <b>Tel:</b> +99899-759-88-86\n\n 🚩 <b>Moʻljal:</b> Urganch, Darital, 2-qavat\n\n👨🏻‍💻<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price3'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1473'}]
  ]
}})})

bot.action('price3', async (ctx) => {
  return  await ctx.answerCbQuery('O\'rgan va hayratda qoldir!\nAgar siz bu sohaga qiziqsangiz "Video montaj" kurslarimiz aynan siz uchun!\nKurs narxi chegirma bilan 950 000 ming so\'m.', {show_alert: true})
})
  


bot.hears('📱 Android dasturlash', async (ctx) => {
  return await ctx.reply('<b>🚀Trendda bo\'ling va biz bilan parvoz qiling!</b>\n\n<b>🎯Siz IT sohasiga qiziqasizmi va dasturlashni o\'rganmoqchimisiz?</b>\nUnda <b>"Android dasturlash"</b> kurslarimiz aynan siz uchun!\n\n• Boshlang\'ich bilim talab etilmaydi;• Minimal yosh chegarasi 14 yosh;\n• Kurs davomiyligi 3 oy;\n• Darslar haftada 3 kun, 4 soatdan;\• Guruhga 9 nafar qatnashuvchi qabul qilinadi;\n• Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\n• Har bir guruhga 2 ta o\'qituvchi mentorlik qiladi;\n• Kurs yakunida sertifikat beriladi;\n\n👨‍💻Kurslarimizda qatnashib nafaqat mobil ilovalar yaratish va balki tobora rivojlanib borayotgan smart qurilmalariga ham dasturiy ta’minot yaratishni o\'rganishingiz mumkin.\n\n<b>🔵Kurs davomida quyidagi imkoniyatlarga ega bo’lasiz:</b>\n\n▪️Chuqurlashtirilgan Java dasturlash texnologiyalari saboqlari\n▪️Istalgan yo’nalishdagi Android ilova yarata olish imkoniyati\n▪️<b>Yuqori daromadli</b> ishga ega bo’lish imkoniyati\n▪️Zamonaviy texnik qurilmalar uchun dasturiy ta’minot yaratish(smartfonlar, soatlar, televizorlar, fitness bilakuzuklar va hokazo)\n▪️<b>Freelancing</b> yordamida masofaviy qo’shimcha daromad qilish.\n\n👨🏻‍💻 Darslarni sohada 6 yillik tajribaga ega android dasturchi  <a href="https://bit.ly/3r7uTo3">Doniyor Xujamovo</a> olib boradi.\n\n📞 <b>Tel:</b> +99899-759-88-86\n\n 🚩 <b>Moʻljal:</b> Urganch, Darital, 2-qavat\n\n👨🏻‍💻<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price4'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1460'}]
  ]
}})})

bot.action('price4', async (ctx) => {
  return  await ctx.answerCbQuery('Siz IT sohaga qiziqasizmi va dasturlashni o\'rganmoqchimisiz?\nUnda "Android dasturlash" kurslarimiz aynan siz uchun!\nKurs narxi chegirma bilan 750 000 ming so\'m.', {show_alert: true})
})



bot.hears('💻 Kompyuter Savodxonligi', async (ctx) => {
  return await ctx.reply('<b>💻🤩Kompyuterni o\'rgan va hayotingni osonlashtir!</b>\n\n🧑🏻‍💻<b>Buning</b> uchun esa <b>"DATA"</b> o\'quv markazida <b>"Kompyuter savodxonligi"</b> yo\'nalishida 2 oy taxsil olishning o\'zi yetarli.\n\n• Boshlang\'ich bilim talab etilmaydi;\n• Minimal yosh chegarasi 14 yosh;\n• Kurs davomiyligi 2 oy;\n• Darslar haftada 3 kun, 2 soatdan;\n• Darslar kompyuterlar bilan jihozlangan xonada o\'tadi\n• Kurs yakunida sertifikat beriladi;\n\n<b>Kursda quyidagi ofis dasturlari zamonaviy tarzda o\'rgatiladi:</b>\n<b>🔘Ms Word</b>\n<b>🔘Ms Excel</b>\n<b>🔘Ms Power Point dasturlari</b>\n\n🧑‍💻Kursni <b>"SWPU"</b> universitetining <b>"Computer engineering"</b> kurs talabasi, yuqoridagi dasturlar bo\'yicha mutaxassis  <a href="https://t.me/data_learning_centre/1487">Jamshidbek Qurbonboev</a> olib boradi.\n\n<a href="https://t.me/Data_Administrator">Administratorlar bilan aloqa</a>\n\n📞 <b>Tel:</b> +99899-759-88-86\n\n 🚩 <b>Moʻljal:</b> Urganch, Darital, 2-qavat\n\n👨🏻‍💻<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price5'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1487'}]
  ]
}})})

bot.action('price5', async (ctx) => {
  return  await ctx.answerCbQuery('Kompyuterni o\'rgan va hayotingni osonlashtir!\nKurs narxi chegirma bilan 455 000 ming so\'m.', {show_alert: true})
})
    


bot.hears('☎️ Aloqa', async (ctx) => {
  return await ctx.reply('<b>👨🏻‍💻"DATA" - Xorazmda birinchi innovatsion texnologiyalar markazi bo\'lib hazoirgi kunda ko\'plab o\'quvchilarga IT sohasidagi eng yaxshi bilimlarni berib va ularni o\'z maqsadlari sari intilishiga ko\'maklashayotgan ta\'lim markazi hisoblanadi.</b>\n\n<b>Siz "DATA" markazida quyidagi kursalar orqali bilim olishingz mumkun.</b>\n💻 Web dasturlash \n📱 Android dasturlash\n🎥 Video montaj\n📐 Arxitektura va dizayn\n🏗 Arxitektura va SMETA ishlash\n🖥 Kompyuter savadxonligi\n\n<b>Aloqa uchun</b>\n<b>📞 Tel:</b>  +998997598886\n<b>🔗 Web Sayt:</b>  <a href="http://Datalearningcentre.uz">Datalearningcentre.uz</a>\n<b>📍 Manzil:</b>  Urganch, DARITAL\n<a href="https://t.me/Data_Administrator">👩  Administrator</a>\n<a href="https://form.jotform.com/201725058712451">🌐  Online ro\'yxatdan o\'tish</a>\n\n👨🏻‍💻<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}]
  ]
}})})
  

bot.hears('🔝 Main Menu', async (ctx) => {
  return await ctx.reply('🔝 Main Menu', Markup
    .keyboard([
      ['🔹 DATA learning centre 🔸', '📋 O\'quv kurslar'],
      ['☎️ Aloqa', '📍 Location'],
      ['📝 Registratsiya']
    ])
    .resize()
  )
})

bot.hears('🔹 DATA learning centre 🔸', async (ctx) => {

  return await ctx.replyWithVideo(
    { source: './video/video.mp4' },
    { caption: 'Siz IT soha mutaxassissi bo\'lishni istayszimi? \n \n ✅ Unda sizni, Urganch shahrida faoliyat ko\'rsatayotgan "DATA" o\'quv markazining 3 oydan 4 oygacha bo’lgan kasbga o’qitish kurslariga taklif etamiz.\n\n “DATA” innovatsion texnologiyalar markazi o\'quv kurslari:\n💻 Web dasturlash;\n📱 Android dasturlash;\n🎥 Video montaj;\n📐Arxitektura va dizayn;\n🏗Qurilish ishlari SMETAsini ishlash;\n🖥Kompyuter Savodxonligi;\n\n😎Darslarni professional mutaxassislar olib borishib, amaliy mashg’ulotlar kompyuterlar bilan jihozlangan hududda bo’lib o’tadi.🥳\n\n🎓Kurs yakunida qatnashuvchilarga sertifikat beriladi. Kurslarimizda o\'qish uchun hoziroq online anketa to\'ldiring!\n\n<a href="https://form.jotform.com/201725058712451">📱Online anketa to\'ldirish</a>\n\n<a href="https://t.me/Data_Administrator">🧑🏻‍💼Administratorlar bilan aloqa</a>\n\n📞 Tel: +99899-759-88-86\n\n🚩 Moʻljal: Urganch, Darital, 2-qavat\n\n➡️ @data_learning_centre', parse_mode: 'html' })
})


bot.hears('📍 Location', async (ctx) => {
  ctx.telegram.sendLocation(ctx.chat.id, 41.56044515274724, 60.607803062078204)
})




bot.launch()





