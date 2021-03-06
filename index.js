const {Telegraf, session, Scenes: {BaseScene, Stage}, Markup} = require('telegraf');
require('dotenv').config();


const bot = new Telegraf(process.env.BOT_TOKEN);
const chatId = process.env.CHATID;



bot.command('start', async (ctx) => {
  return await ctx.reply(`Assalom alaykum ${ctx.message.from.first_name}!  Pastdan kerakli b\'limni tanlang! `, Markup
    .keyboard([
      ['š¹ DATA learning centre šø', 'š O\'quv kurslar'],
      ['āļø Aloqa', 'š Location'],
      ['š Registratsiya']
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
    `Anketa o\'rnatildi jo'natishni tasdiqlaysizmi?\n\nšØāš Ismi: ${ctx.session?.name}\nš§ Yoshi: ${ctx.session?.age}\nš» Tanlangan yo\'nalish: ${ctx.session?.course}\nš Ma\'lumoti: ${ctx.session?.info}`,
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
    Markup.keyboard([["š Registratsiya"]]).resize()
  );
});
bot.hears("š Registratsiya", (ctx) => ctx.scene.enter("nameScene"));
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
    `Yangi o'quvchi\n\nšØāš Ismi: ${ctx.session?.name}\nš§ Yoshi: ${ctx.session?.age}\nš» Tanlangan yo\'nalish: ${ctx.session?.course}\nš Ma\'lumoti: ${ctx.session?.info}`
  );
});



//registratsiya

  bot.hears('š O\'quv kurslar', async (ctx) => {
    return await ctx.reply('š O\'quv kurslar', Markup
      .keyboard([
        ['š Arxitektura va dizayn', 'š Arxitektura SMETA'],
        ['š» Web dasturlash', 'š„ Video montaj'],
        ['š± Android dasturlash', 'š» Kompyuter Savodxonligi'],
        ['š Main Menu']
      ])
      .resize()
    )
  })



  bot.hears('š Arxitektura va dizayn', async (ctx) => {
    return await ctx.reply('<b>"Arxitektura va dizayn" kurslari. 3 oyda noldan professionalgacha!</b>\n\n<b>1.Kurs kimlar uchun:</b>\nš¹Mazkur sohada ishlamoqchi bo\'lganlar;\nš¹Dizayn studiya xodimlari;\nš¹Shu yo\'nalishida universitetga kirmoqchi bo\'lganlar;\nš¹3D model yaratishni o\'rganmoqchi bo\'lganlar;\n\n <b>2.Darsliklar dasturi:</b> \n šøAutoCAD\nšø3Ds MAX\nšøLumion\n\n<b>3.Kurs haqida</b>\nā¢ Davomiyligi: 3 oy;\nā¢ Dars vaqti: Du,Cho,Ju kunlari, soat 11:00-13:00 gacha;\nā¢ 10 nafar qatnashuvchi qabul qilinadi;\nā¢ Har bir o\'quvchiga kompyuter beriladi;\nā¢ Kurs yakunida sertifikat beriladi;\n\n<b>4.Kurs narxi haqida</b>\nKurs narxi 30% chegirma bilan.\n750 000 ming so\'m\n\n<b>ā ļø DIQQAT!</b>  Kurs davomida talabalar haqiqiy Arxitektor sifatida ishlaydilar: AutoCAD dasturida maket yaratish, 3Ds MAX bilan ishlash, dekorativ elementlar bilan inshoat yaratish, animatsiya bilan ishlash, modelni optimallashtirish va oxirida ā tugallangan loyihalarni taqdimot qilish. <a href="https://form.jotform.com/201725058712451">Kursda o\'qish uchun hoziroq online anketa to\'diring yoki adminstartorlar bilan bog\'laning!</a>\n\nš Tel: +99899-759-88-86\n\nš©š»āš» @Data_Administrator\n\nā”ļø MoŹ»ljal: Urganch, Darital 2-qavat\n\n<b>š»"DATA" - innovatsion texnologiyalar ta\'lim markazi</b>\n\n<a href="http://t.me/data_learning_centre">Telegram</a> | <a href="http://instagram.com/data_learning_centre">Instagram</a>  |  <a href="http://youtube.com/data_learning_centre">YouTube</a>',
    
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



bot.hears('š Arxitektura SMETA', async (ctx) => {
  return await ctx.reply('<b>XORAZMDA ILK MAROTABA!</b>\n\n<b>Siz yetuk smeta mutaxassisi bo\'lishni xohlaysizmi? Qurilish, ta\'mirlash va rekonstruksiya yo\'nalishlarida smeta hisob-kitob malakasini o\'zlashtirmoqchimisiz?</b>\n\n<b>"DATA"</b> o\'quv markazida <b>\"Qurilishda smeta ishi\"</b> yo\'nalishi bo\'yicha yangi yo\'nalish.\n\nš¢ <b>\"Qurilishda smeta ishi kimlar uchun?:</b>\n\nā”ļø Loyiha tashkilotlari xodimlari;\nā”ļø Qurilish tashkilotlari xodimlari;\nā”ļø Smeta ishlashni o\'rganishni xohlagan ko\'ngillilar;\nā”ļø Zamonaviy va talab yuqori kasb egasi bo\'lishni istaganlar.\n\nš¢ <b>Darsda nimalarni bilib olasiz?:</b>\n\nā”ļø Smeta ishining ahamiyati va tarkibi;\nā”ļø Qurilish sohasida smeta hujjatini tayyorlash texnologiyasi;\nā”ļø āQurqiymatasos-2005ā dasturni amalyotda qo\'llanilishi;\nā”ļø Bozor iqtisodiyoti sharoitida qurilish materiyallari, ish haqi va moshina mexanizimlar harajatlarini o\'zgaruvchanligi;\nā”ļø Yakuniy smeta hujjatini taxt qilish;\nā”ļø 3 oylik kursni tugatgach qanday joylarda ishlash mumkinligini;\n\nšš»āāļøShoshiling, bunday imkoniyatni o\'tkazib yubormang!š\n\n<b>Ochiq darslarda ishtirok etish uchun administrator bilan bog\'laning!</b>\n\nš Tel: +99899-759-88-86\n\n š© <b>MoŹ»ljal:</b> Urganch, Darital, 2-qavat\n\nšØš»āš»<b>\"DATA\"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
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



bot.hears('š» Web dasturlash', async (ctx) => {
  return await ctx.reply('<b>O\'z kelajagingizni IT soha bilan bog\'lang. Buning uchun "Web dasturlash" kursida o\'qing!š¤</b>\n\n<b>Qisqach ma\'lumot</b>\n ā¢ Darslar noldan boshlab o\'rgatiladi;\nā¢ Minimal yosh chegarasi 14 yosh;\nā¢ Kurs davomiyligi 3 oy;\nā¢ Darslar haftada 3 kun, 4 soatdan;\nā¢ Guruhga 9 nafar qatnashuvchi qabul qilinadi;\nā¢ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\nā¢ Har bir guruhga 2 ta o\qituvchi mentorlik qiladi;\nā¢ Kurs yakunida sertifikat beriladi;\n\n<b>Darsliklar dasturi:</b>\n<b>āŖļø (Frontend)| HTML, CSS3, JS, Bootstrap</b>\n<b>āŖļø (Backend)| PHP, MySQL</b>\n<b>āŖļø DevOps</b>(Domain, Server, ishchi muhit konfiguratsiyasi yaāni dasturlarni oārnatish ulardan foydalanib kod yozish hamda local testlash jarayonlari, ā¦)\n\n<b>š§š»āš» Kurs davomida talabalar haqiqiy programmist sifatida ishlaydilar:</b>Sahifalarni yaratish, Photoshop tartiblari bilan ishlash, dekorativ elementlar bilan saytni yaratish, animatsiya bilan ishlash, kodni optimallashtirish va oxirida ā tugallangan loyihalarni internetda nashr qilish uchun tayyorlash.\n\n<b>O\'qitvichilar</b>\n<a href="https://t.me/data_learning_centre/1540">Alisher Xo\'janiyazov</a>\n<a href="https://t.me/data_learning_centre/1222">Kamron Fozilov</a>\n\nš <b>Tel:</b> +99899-759-88-86\n\n š© <b>MoŹ»ljal:</b> Urganch, Darital, 2-qavat\n\nšØš»āš»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
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


  
bot.hears('š„ Video montaj', async (ctx) => {
  return await ctx.reply('<b>š O\'rgan va hayratda qoldir!š¤©</b>\n\n<code>š“ Bugungi kunda televideniye, kino sanoati, reklama, "Youtube" hamda Instagram bloglari, onlayn ta\'lim va yana boshqa turdagi sohalarni videolavhalarsiz tasavvur qilib bo\'lmaydi.Albatta bu yo\'nalishda videolarni kreativ montaj qilib hammani hayratga solishingiz va proffessional mutaxassis sifatida katta mablag\' ishlashingiz mumkin!</code>\n\nāBuning uchun esa video montajni o\'rganishingiz kerak!\nAgar siz bu sohasiga qiziqsangiz "Video montaj" kurslarimiz aynan siz uchun!\n\nā¢ Boshlang\'ich bilim talab etilmaydi\nā¢ Minimal yosh chegarasi 14 yosh;\nā¢ Kurs davomiyligi 3 oy;\nā¢ Darslar haftada 3 kun, 4 soatdan;\nā¢ Guruhga 9 nafar qatnashuvchi qabul qilinadi;\nā¢ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\nā¢ Kurs yakunida sertifikat beriladi;\n\nšµKurs davomida quyidag dasturlarda ishlashni o\'rganasiz:\n\n<b>š Adobe Premiere Pro</b>\n<b>š Adobe After Effects</b>\n<b>š Cinema 4D</b>\n\nš§āš»Darslarni <b>āSTRONG EFFECTā</b> o\'quv sistemasi asoschisi. Sohada 10 yillik tajribaga ega, oliy ma\'lumotli, <b>ZO\'R TV</b>, <b>O\'zbekkino</b> agentliklarida faoliyat yuritgan  <a href=\"https://t.me/data_learning_centre/1473\">O\'tkirbek Karimov</a> olib boradi.\n\n<a href="https://t.me/Data_Administrator">š§š»āš¼Administratorlar bilan aloqa</a>\n\nš <b>Tel:</b> +99899-759-88-86\n\n š© <b>MoŹ»ljal:</b> Urganch, Darital, 2-qavat\n\nšØš»āš»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
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
  


bot.hears('š± Android dasturlash', async (ctx) => {
  return await ctx.reply('<b>šTrendda bo\'ling va biz bilan parvoz qiling!</b>\n\n<b>šÆSiz IT sohasiga qiziqasizmi va dasturlashni o\'rganmoqchimisiz?</b>\nUnda <b>"Android dasturlash"</b> kurslarimiz aynan siz uchun!\n\nā¢ Boshlang\'ich bilim talab etilmaydi;ā¢ Minimal yosh chegarasi 14 yosh;\nā¢ Kurs davomiyligi 3 oy;\nā¢ Darslar haftada 3 kun, 4 soatdan;\ā¢ Guruhga 9 nafar qatnashuvchi qabul qilinadi;\nā¢ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\nā¢ Har bir guruhga 2 ta o\'qituvchi mentorlik qiladi;\nā¢ Kurs yakunida sertifikat beriladi;\n\nšØāš»Kurslarimizda qatnashib nafaqat mobil ilovalar yaratish va balki tobora rivojlanib borayotgan smart qurilmalariga ham dasturiy taāminot yaratishni o\'rganishingiz mumkin.\n\n<b>šµKurs davomida quyidagi imkoniyatlarga ega boālasiz:</b>\n\nāŖļøChuqurlashtirilgan Java dasturlash texnologiyalari saboqlari\nāŖļøIstalgan yoānalishdagi Android ilova yarata olish imkoniyati\nāŖļø<b>Yuqori daromadli</b> ishga ega boālish imkoniyati\nāŖļøZamonaviy texnik qurilmalar uchun dasturiy taāminot yaratish(smartfonlar, soatlar, televizorlar, fitness bilakuzuklar va hokazo)\nāŖļø<b>Freelancing</b> yordamida masofaviy qoāshimcha daromad qilish.\n\nšØš»āš» Darslarni sohada 6 yillik tajribaga ega android dasturchi  <a href="https://bit.ly/3r7uTo3">Doniyor Xujamovo</a> olib boradi.\n\nš <b>Tel:</b> +99899-759-88-86\n\n š© <b>MoŹ»ljal:</b> Urganch, Darital, 2-qavat\n\nšØš»āš»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
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



bot.hears('š» Kompyuter Savodxonligi', async (ctx) => {
  return await ctx.reply('<b>š»š¤©Kompyuterni o\'rgan va hayotingni osonlashtir!</b>\n\nš§š»āš»<b>Buning</b> uchun esa <b>"DATA"</b> o\'quv markazida <b>"Kompyuter savodxonligi"</b> yo\'nalishida 2 oy taxsil olishning o\'zi yetarli.\n\nā¢ Boshlang\'ich bilim talab etilmaydi;\nā¢ Minimal yosh chegarasi 14 yosh;\nā¢ Kurs davomiyligi 2 oy;\nā¢ Darslar haftada 3 kun, 2 soatdan;\nā¢ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi\nā¢ Kurs yakunida sertifikat beriladi;\n\n<b>Kursda quyidagi ofis dasturlari zamonaviy tarzda o\'rgatiladi:</b>\n<b>šMs Word</b>\n<b>šMs Excel</b>\n<b>šMs Power Point dasturlari</b>\n\nš§āš»Kursni <b>"SWPU"</b> universitetining <b>"Computer engineering"</b> kurs talabasi, yuqoridagi dasturlar bo\'yicha mutaxassis  <a href="https://t.me/data_learning_centre/1487">Jamshidbek Qurbonboev</a> olib boradi.\n\n<a href="https://t.me/Data_Administrator">Administratorlar bilan aloqa</a>\n\nš <b>Tel:</b> +99899-759-88-86\n\n š© <b>MoŹ»ljal:</b> Urganch, Darital, 2-qavat\n\nšØš»āš»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
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
    


bot.hears('āļø Aloqa', async (ctx) => {
  return await ctx.reply('<b>šØš»āš»"DATA" - Xorazmda birinchi innovatsion texnologiyalar markazi bo\'lib hazoirgi kunda ko\'plab o\'quvchilarga IT sohasidagi eng yaxshi bilimlarni berib va ularni o\'z maqsadlari sari intilishiga ko\'maklashayotgan ta\'lim markazi hisoblanadi.</b>\n\n<b>Siz "DATA" markazida quyidagi kursalar orqali bilim olishingz mumkun.</b>\nš» Web dasturlash \nš± Android dasturlash\nš„ Video montaj\nš Arxitektura va dizayn\nš Arxitektura va SMETA ishlash\nš„ Kompyuter savadxonligi\n\n<b>Aloqa uchun</b>\n<b>š Tel:</b>  +998997598886\n<b>š Web Sayt:</b>  <a href="http://Datalearningcentre.uz">Datalearningcentre.uz</a>\n<b>š Manzil:</b>  Urganch, DARITAL\n<a href="https://t.me/Data_Administrator">š©  Administrator</a>\n<a href="https://form.jotform.com/201725058712451">š  Online ro\'yxatdan o\'tish</a>\n\nšØš»āš»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}]
  ]
}})})
  

bot.hears('š Main Menu', async (ctx) => {
  return await ctx.reply('š Main Menu', Markup
    .keyboard([
      ['š¹ DATA learning centre šø', 'š O\'quv kurslar'],
      ['āļø Aloqa', 'š Location'],
      ['š Registratsiya']
    ])
    .resize()
  )
})

bot.hears('š¹ DATA learning centre šø', async (ctx) => {

  return await ctx.replyWithVideo(
    { source: './video/video.mp4' },
    { caption: 'Siz IT soha mutaxassissi bo\'lishni istayszimi? \n \n ā Unda sizni, Urganch shahrida faoliyat ko\'rsatayotgan "DATA" o\'quv markazining 3 oydan 4 oygacha boālgan kasbga oāqitish kurslariga taklif etamiz.\n\n āDATAā innovatsion texnologiyalar markazi o\'quv kurslari:\nš» Web dasturlash;\nš± Android dasturlash;\nš„ Video montaj;\nšArxitektura va dizayn;\nšQurilish ishlari SMETAsini ishlash;\nš„Kompyuter Savodxonligi;\n\nšDarslarni professional mutaxassislar olib borishib, amaliy mashgāulotlar kompyuterlar bilan jihozlangan hududda boālib oātadi.š„³\n\nšKurs yakunida qatnashuvchilarga sertifikat beriladi. Kurslarimizda o\'qish uchun hoziroq online anketa to\'ldiring!\n\n<a href="https://form.jotform.com/201725058712451">š±Online anketa to\'ldirish</a>\n\n<a href="https://t.me/Data_Administrator">š§š»āš¼Administratorlar bilan aloqa</a>\n\nš Tel: +99899-759-88-86\n\nš© MoŹ»ljal: Urganch, Darital, 2-qavat\n\nā”ļø @data_learning_centre', parse_mode: 'html' })
})


bot.hears('š Location', async (ctx) => {
  ctx.telegram.sendLocation(ctx.chat.id, 41.56044515274724, 60.607803062078204)
})




bot.launch()





