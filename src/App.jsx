import { useState } from "react";

const SIGNS = [
  { name: "Koç", en: "Aries", symbol: "♈", dates: "21 Mar – 19 Nis", element: "Ateş", stone: "Kırmızı Akik", stoneEmoji: "🔴" },
  { name: "Boğa", en: "Taurus", symbol: "♉", dates: "20 Nis – 20 May", element: "Toprak", stone: "Zümrüt", stoneEmoji: "💚" },
  { name: "İkizler", en: "Gemini", symbol: "♊", dates: "21 May – 20 Haz", element: "Hava", stone: "Akvamarin", stoneEmoji: "🔵" },
  { name: "Yengeç", en: "Cancer", symbol: "♋", dates: "21 Haz – 22 Tem", element: "Su", stone: "İnci", stoneEmoji: "⚪" },
  { name: "Aslan", en: "Leo", symbol: "♌", dates: "23 Tem – 22 Ağu", element: "Ateş", stone: "Altın Topaz", stoneEmoji: "🟡" },
  { name: "Başak", en: "Virgo", symbol: "♍", dates: "23 Ağu – 22 Eyl", element: "Toprak", stone: "Yeşim", stoneEmoji: "💚" },
  { name: "Terazi", en: "Libra", symbol: "♎", dates: "23 Eyl – 22 Eki", element: "Hava", stone: "Opal", stoneEmoji: "🌈" },
  { name: "Akrep", en: "Scorpio", symbol: "♏", dates: "23 Eki – 21 Kas", element: "Su", stone: "Obsidyen", stoneEmoji: "⚫" },
  { name: "Yay", en: "Sagittarius", symbol: "♐", dates: "22 Kas – 21 Ara", element: "Ateş", stone: "Turkuaz", stoneEmoji: "🩵" },
  { name: "Oğlak", en: "Capricorn", symbol: "♑", dates: "22 Ara – 19 Oca", element: "Toprak", stone: "Oniks", stoneEmoji: "🖤" },
  { name: "Kova", en: "Aquarius", symbol: "♒", dates: "20 Oca – 18 Şub", element: "Hava", stone: "Ametist", stoneEmoji: "💜" },
  { name: "Balık", en: "Pisces", symbol: "♓", dates: "19 Şub – 20 Mar", element: "Su", stone: "Aytaşı", stoneEmoji: "🔮" },
];

const LUCK_COLORS = [
  { name: "Derin Mor", emoji: "💜" }, { name: "Gül Altını", emoji: "🌹" },
  { name: "Zümrüt Yeşili", emoji: "💚" }, { name: "Safir Mavisi", emoji: "💙" },
  { name: "Yakut Kırmızısı", emoji: "❤️" }, { name: "Altın Sarısı", emoji: "✨" },
  { name: "Gümüş", emoji: "🩶" }, { name: "Buz Mavisi", emoji: "🩵" },
];

const DAILY = {
  "Koç": [
    `🌟 Genel Enerji\nBugün Mars'ın güçlü etkisiyle içinizdeki ateş her zamankinden daha parlak yanıyor. Yeni başlangıçlar için mükemmel bir gün; ertelediklerinizi hayata geçirme vakti geldi. Cesaretiniz sizi doğru yere götürecek.\n\n❤️ Aşk & İlişkiler\nPartneriyle geçirilen kaliteli zaman bugün çok değerli. Duygularınızı açıkça ifade etmekten çekinmeyin; karşınızdaki bunu bekliyor olabilir.\n\n💼 Kariyer & Para\nİş hayatında öne çıkma fırsatı doğuyor. Fikirlerinizi paylaşın, sessiz kalmak size yaramaz. Mali konularda aceleci kararlardan kaçının.\n\n🌿 Sağlık & Enerji\nFiziksel enerji yüksek ama stresi yönetmeye dikkat edin. Kısa bir yürüyüş zihninizi tazeleyecek.\n\n🔮 Günün Mesajı\nCesaretin içinde zaten var — sadece kullanmayı seç.`,
    `🌟 Genel Enerji\nYıldızlar bugün sizi aktif ve dinamik bir güne yönlendiriyor. Önünüze çıkan fırsatları değerlendirin, tereddüt etmeyin. Ateş enerjiniz zirveye ulaşmak üzere.\n\n❤️ Aşk & İlişkiler\nSevdiklerinizle ara açılmışsa bugün köprü kurma zamanı. Küçük bir jest bile büyük fark yaratabilir.\n\n💼 Kariyer & Para\nYeni bir proje veya iş birliği kapıda olabilir. Gelen teklifleri dikkatlice değerlendirin.\n\n🌿 Sağlık & Enerji\nEnerjiniz yüksek; bu gücü yaratıcı bir aktiviteye yönlendirin.\n\n🔮 Günün Mesajı\nHarekete geçmek için doğru zaman hep şimdiki andır.`,
  ],
  "Boğa": [
    `🌟 Genel Enerji\nVenüs'ün rehberliğinde bugün konfor ve güzelliğe yöneliyor ruhunuz. Sabırlı adımlarla ilerlemeye devam edin; acele eden saatçi saati bozar. Güvenilirliğiniz bugün size büyük avantaj sağlıyor.\n\n❤️ Aşk & İlişkiler\nDerin ve kalıcı bağlar kurma konusunda yeteneğiniz bugün parılıyor. İlişkinizi beslemek için küçük sürprizler yapın.\n\n💼 Kariyer & Para\nMaddi konularda dikkatli ama umut verici bir gün. Uzun vadeli yatırımlar için değerlendirme yapın.\n\n🌿 Sağlık & Enerji\nDoğayla iç içe geçirilen zaman ruhunuzu besleyecek. Beslenmenize özen gösterin.\n\n🔮 Günün Mesajı\nSabır; en güzel meyvelerin olgunlaşması için zamana ihtiyaç duyduğunu unutma.`,
    `🌟 Genel Enerji\nBugün toprak enerjisi sizi sakinleştiriyor ve odaklanmanıza yardımcı oluyor. Pratik adımlar atın, hayallerinizi somutlaştırın.\n\n❤️ Aşk & İlişkiler\nSevdiklerinize güven verin; bu onlar için en değerli hediyedir.\n\n💼 Kariyer & Para\nEmeklerinizin karşılığını almaya başlıyorsunuz. Sabırla yürüdüğünüz yol meyvelerini veriyor.\n\n🌿 Sağlık & Enerji\nZihninizi dinlendirmek için sessizliğe çekilin, meditasyon deneyin.\n\n🔮 Günün Mesajı\nKökleriniz ne kadar derinse, yükseliş o kadar güçlü olur.`,
  ],
  "İkizler": [
    `🌟 Genel Enerji\nMerkür'ün etkisiyle zihniniz bugün pırıl pırıl. Yeni fikirler peş peşe geliyor; bunları not etmeyi unutmayın. Sosyal enerjiniz zirveye yakın, iletişim kapılarını açık tutun.\n\n❤️ Aşk & İlişkiler\nSözlerinizin gücünü kullanın; içtenlikle söylenen birkaç cümle ilişkinizi dönüştürebilir.\n\n💼 Kariyer & Para\nYaratıcı fikirleriniz takdir görüyor. Ağınızı genişletmek için harika bir gün.\n\n🌿 Sağlık & Enerji\nZihninizi dinlendirin; çok fazla düşünmek yorgunluğa yol açabilir.\n\n🔮 Günün Mesajı\nİki yol göründüğünde, ikisini de denemekten korkmayan sensin.`,
    `🌟 Genel Enerji\nBugün merakınız sizi heyecan verici yerlere götürüyor. Öğrenmek, keşfetmek ve paylaşmak için ideal bir gün.\n\n❤️ Aşk & İlişkiler\nEğlenceli bir enerji var çevrenizde; sevdiğinizle güzel anlar yaratın.\n\n💼 Kariyer & Para\nÇoklu görevlerde başarılı olduğunuzu kanıtlama fırsatınız var.\n\n🌿 Sağlık & Enerji\nNefes egzersizleri zihninizi sakinleştirecek.\n\n🔮 Günün Mesajı\nMerak, hayatın en güzel pusulasıdır.`,
  ],
  "Yengeç": [
    `🌟 Genel Enerji\nAy'ın çocuğu olarak bugün duygusal derinliğiniz bir güç kaynağına dönüşüyor. Sezgilerinize güvenin; içinizden gelen ses sizi yanıltmaz. Yuvanız ve sevdikleriniz bugün her şeyden önemli.\n\n❤️ Aşk & İlişkiler\nDuygusal yakınlık bugün ön planda. Sevdiklerinize ne hissettiklerini sormayı unutmayın.\n\n💼 Kariyer & Para\nEkip çalışmasında öne çıkan bir gün. Liderlik nitelikleriniz fark ediliyor.\n\n🌿 Sağlık & Enerji\nDuygusal dengenizi korumak için kendinize zaman ayırın.\n\n🔮 Günün Mesajı\nKalbin bilgeliği, aklın hesapladığından çok daha derine uzanır.`,
    `🌟 Genel Enerji\nBugün koruyucu ve şefkatli enerjiniz etrafınızdakilere ışık saçıyor. Kendinize de aynı şefkati göstermeyi unutmayın.\n\n❤️ Aşk & İlişkiler\nSevdiklerinizi koruyan kalkanınız bugün daha da güçlü hissettiriyor.\n\n💼 Kariyer & Para\nSezgisel kararlar bugün sizi doğru yöne götürüyor.\n\n🌿 Sağlık & Enerji\nSuya dokunmak; banyo, yüzme veya deniz kenarında yürüyüş ruhunuzu yenileyecek.\n\n🔮 Günün Mesajı\nEn derin sevgi, önce kendine gösterdiğin sevgiden doğar.`,
  ],
  "Aslan": [
    `🌟 Genel Enerji\nGüneş'in çocuğu bugün sahnede! Karizmanız ve özgüveniniz çevrenizdekileri büyülüyor. Yaratıcılığınızı ifade etmek için mükemmel bir gün; ışığınızı saklama.\n\n❤️ Aşk & İlişkiler\nRomantik enerji yüksek; partneriyle kaliteli zaman geçirmek için ideal bir gün.\n\n💼 Kariyer & Para\nLiderlik yetenekleriniz ön plana çıkıyor. Büyük kararlar vermek için cesur olun.\n\n🌿 Sağlık & Enerji\nEnerji bolluğunuzu yaratıcı bir hobiye kanalize edin.\n\n🔮 Günün Mesajı\nAsıl güç, parlamaktan değil; başkalarını da parlatmaktan gelir.`,
    `🌟 Genel Enerji\nBugün içinizdeki kral ya da kraliçe uyandı. Kendinize inanın ve bunu dünyaya gösterin.\n\n❤️ Aşk & İlişkiler\nCömertliğiniz ilişkinize renk katıyor. Sürprizler yapma vakti!\n\n💼 Kariyer & Para\nFikirleriniz bugün altın değerinde; paylaşmaktan çekinmeyin.\n\n🌿 Sağlık & Enerji\nGüneş ışığı altında zaman geçirmek size enerji verecek.\n\n🔮 Günün Mesajı\nIşığını gizleme; dünya seni görmek istiyor.`,
  ],
  "Başak": [
    `🌟 Genel Enerji\nMerkür'ün analitik enerjisiyle bugün her detayı görüyor ve anlıyorsunuz. Mükemmeliyetçiliğiniz bugün bir avantaja dönüşüyor; ancak fazla katı olmamaya özen gösterin.\n\n❤️ Aşk & İlişkiler\nKüçük jestler büyük anlam taşıyor. Sevdiğiniz kişiye gösterdiğiniz özen onu derinden etkiliyor.\n\n💼 Kariyer & Para\nDetaylara verdiğiniz önem bir projeyi mükemmel sonuca taşıyor.\n\n🌿 Sağlık & Enerji\nSağlıklı beslenme ve düzenli uyku bugün önceliğiniz olsun.\n\n🔮 Günün Mesajı\nMükemmellik bir hedef değil, her adımda gösterilen özenin doğal sonucudur.`,
    `🌟 Genel Enerji\nBugün organize ve verimli bir gün sizi bekliyor. Ertelediklerinizi yapma zamanı geldi.\n\n❤️ Aşk & İlişkiler\nPratik sevgi gösterileri; bir hediye, yapılan bir iş, söylenen güzel bir söz ilişkinizi güçlendiriyor.\n\n💼 Kariyer & Para\nSistematik çalışmanız bugün somut sonuçlar doğuruyor.\n\n🌿 Sağlık & Enerji\nZihninizi boşaltmak için günlük tutun veya sessizce oturun.\n\n🔮 Günün Mesajı\nHer büyük şey, küçük ve düzenli adımlarla inşa edilir.`,
  ],
  "Terazi": [
    `🌟 Genel Enerji\nVenüs'ün zarafetini taşıyan bugün, denge ve uyumu aramanızı destekliyor. Güzellik her yerde; sadece bakmayı bilmek gerekiyor. Diplomatik yetenekleriniz bugün parılıyor.\n\n❤️ Aşk & İlişkiler\nRomantik atmosfer bugün doruğa ulaşıyor. Sevdiklerinizle güzel anlar yaratın.\n\n💼 Kariyer & Para\nMüzakere ve uzlaşma gerektiren konularda başarılı olacaksınız.\n\n🌿 Sağlık & Enerji\nZihin-beden dengesini kurmak için yoga veya meditasyon deneyin.\n\n🔮 Günün Mesajı\nHer şeyin bir dengesi vardır; o dengeyi bulmak senin sanatındır.`,
    `🌟 Genel Enerji\nBugün adalet ve dürüstlük ön planda. Doğru olduğuna inandığın için mücadele etmekten çekinme.\n\n❤️ Aşk & İlişkiler\nİlişkinizdeki dengesizlikleri bugün nazikçe ele alın.\n\n💼 Kariyer & Para\nEkip içindeki uyumu sağlama konusunda kilit rol oynuyorsunuz.\n\n🌿 Sağlık & Enerji\nGüzel müzik dinlemek ruhunuzu besleyecek.\n\n🔮 Günün Mesajı\nDenge, durağanlık değil; sürekli bir uyum dansıdır.`,
  ],
  "Akrep": [
    `🌟 Genel Enerji\nPlüton'un derin enerjisiyle bugün yüzeyin altındaki gerçekleri görüyorsunuz. Dönüşüm zamanı; geçmişin ağır yüklerini bırakmak için mükemmel bir an. İçgüdüleriniz size rehberlik ediyor.\n\n❤️ Aşk & İlişkiler\nDerin ve yoğun duygular bugün yüzeye çıkıyor. Kırılganlığınızı göstermekten korkmayın.\n\n💼 Kariyer & Para\nAraştırma ve analiz gerektiren işlerde bugün zirvedesiniz.\n\n🌿 Sağlık & Enerji\nDuygusal detoks için bir şeyleri yazmak veya sanatla ifade etmek faydalı olacak.\n\n🔮 Günün Mesajı\nKaranlık, ışığın ne kadar güçlü olduğunu anlamak için vardır.`,
    `🌟 Genel Enerji\nBugün dönüşüm enerjisi güçlü. Neyi bırakacağınızı ve neyi tutacağınızı bilmek size güç veriyor.\n\n❤️ Aşk & İlişkiler\nGüven, ilişkinizin temeli. Bugün bu temeli pekiştirin.\n\n💼 Kariyer & Para\nStratejik düşünceniz sizi rakiplerinizin önüne geçiriyor.\n\n🌿 Sağlık & Enerji\nDerin nefes egzersizleri içinizdeki gerilimi serbest bırakacak.\n\n🔮 Günün Mesajı\nEn büyük güç, kendini yeniden icat etme cesaretinden gelir.`,
  ],
  "Yay": [
    `🌟 Genel Enerji\nJüpiter'in bolluğuyla bugün ufuklar genişliyor. Özgürlük ve macera ruhunuz canlanıyor; yeni deneyimlere açık olun. İyimserliğiniz etrafınızdakilere de yayılıyor.\n\n❤️ Aşk & İlişkiler\nEğlenceli ve macera dolu anlar ilişkinize taze bir hava katıyor.\n\n💼 Kariyer & Para\nUzak mesafeli iletişim ve uluslararası bağlantılar bugün şanslı.\n\n🌿 Sağlık & Enerji\nAçık havada spor veya yürüyüş ruhunuzu özgürleştirecek.\n\n🔮 Günün Mesajı\nOkun hedefe ulaşması için önce geriye çekilmesi gerekir; hazırlan ve fırlat.`,
    `🌟 Genel Enerji\nBugün felsefi bir ruh halindesiniz. Hayatın anlamını sorgularken yeni cevaplar buluyorsunuz.\n\n❤️ Aşk & İlişkiler\nOrtak hayaller ve planlar ilişkinizi derinleştiriyor.\n\n💼 Kariyer & Para\nYeni öğrenme fırsatları kapıda; değerlendirin.\n\n🌿 Sağlık & Enerji\nBir günlük kaçamak veya küçük bir gezi size iyi gelecek.\n\n🔮 Günün Mesajı\nHer yolculuk, içinde başlar.`,
  ],
  "Oğlak": [
    `🌟 Genel Enerji\nSatürn'ün disipliниyle bugün kararlılığınız ve azminiz dorukta. Uzun vadeli hedeflerinize doğru attığınız her adım sizi güçlendiriyor. Sabır ve çalışkanlık bugün meyve veriyor.\n\n❤️ Aşk & İlişkiler\nGüvenilirliğiniz ve sadakatiniz sevdikleriniz için en değerli hediyes. Bunu ifade edin.\n\n💼 Kariyer & Para\nMali planlamanız ve uzun vadeli vizyonunuz bugün size avantaj sağlıyor.\n\n🌿 Sağlık & Enerji\nDüzenli uyku ve rutinler bugün sizi besliyor.\n\n🔮 Günün Mesajı\nDağın zirvesi, her adımı sayan ayaklara aittir.`,
    `🌟 Genel Enerji\nBugün hedeflerinize olan bağlılığınız ilham verici. Zorluklara rağmen devam eden siz, başarıyı hak ediyorsunuz.\n\n❤️ Aşk & İlişkiler\nKalıcı ve güçlü ilişkiler inşa etme yeteneğiniz bugün parlıyor.\n\n💼 Kariyer & Para\nEmeklerinizin karşılığı alınıyor; sabırlı olmaya devam edin.\n\n🌿 Sağlık & Enerji\nKendinize karşı nazik olun; başarı mükemmellikten değil, süreklilikten gelir.\n\n🔮 Günün Mesajı\nYavaş ilerlemek, durmuş olmak değildir.`,
  ],
  "Kova": [
    `🌟 Genel Enerji\nÜranüs'ün yenilikçi enerjisiyle bugün alışılmışın dışında düşünüyorsunuz. Orijinalliğiniz ve bağımsız ruhunuz sizi öne çıkarıyor. Dünyayı değiştirme hayaliniz bugün bir adım daha yakın.\n\n❤️ Aşk & İlişkiler\nOrijinal ve beklenmedik jestler ilişkinize heyecan katıyor.\n\n💼 Kariyer & Para\nYenilikçi fikirleriniz bugün büyük yankı uyandırıyor.\n\n🌿 Sağlık & Enerji\nTopluluk aktiviteleri ve sosyal bağlar size enerji veriyor.\n\n🔮 Günün Mesajı\nGelecek, onu hayal edenler tarafından inşa edilir.`,
    `🌟 Genel Enerji\nBugün insanlığa hizmet etme arzunuz güçleniyor. Başkalarına katkıda bulunmak içinizi dolduruyor.\n\n❤️ Aşk & İlişkiler\nFikir alışverişi ve entelektüel bağ ilişkinizi besliyor.\n\n💼 Kariyer & Para\nTeknoloji ve yenilik odaklı projeler bugün şanslı.\n\n🌿 Sağlık & Enerji\nAlışılmadık bir aktivite deneyin; yeni şeyler sizi canlandırır.\n\n🔮 Günün Mesajı\nFarklı olmak, öncü olmaktır.`,
  ],
  "Balık": [
    `🌟 Genel Enerji\nNeptün'ün mistik enerjisiyle bugün sezgileriniz ve yaratıcılığınız zirveye çıkıyor. Hayal gücünüz sınırları aşıyor; bu gücü sanatsal ifadeye dönüştürün. Empati yeteneğiniz bugün bir armağan.\n\n❤️ Aşk & İlişkiler\nRomantik ve idealist bir enerji var; aşkı her haliyle kucaklayın.\n\n💼 Kariyer & Para\nSanatsal ve yaratıcı projeler bugün size ilham veriyor.\n\n🌿 Sağlık & Enerji\nMeditasyon veya müzik ruhunuzu derinlemesine besleyecek.\n\n🔮 Günün Mesajı\nHayaller; gerçeğin henüz tamamlanmamış taslağıdır.`,
    `🌟 Genel Enerji\nBugün sezgisel bilginiz çok güçlü. Mantığın ötesinde bir rehberliğe sahipsiniz; ona güvenin.\n\n❤️ Aşk & İlişkiler\nDerin empati yeteneğiniz ilişkinizi benzersiz kılıyor.\n\n💼 Kariyer & Para\nYardım meslekleri ve sanatsal alanlarda bugün başarı sizi bekliyor.\n\n🌿 Sağlık & Enerji\nSuya yakın olmak; deniz, göl veya banyo sizi yenileyecek.\n\n🔮 Günün Mesajı\nEn güçlü akıntı, sessizce akan sudur.`,
  ],
};

const WEEKLY = {
  "Koç": `Pazartesi: Yeni haftaya güçlü bir enerjiyle başlıyorsunuz.\nSalı: İş konularında önemli gelişmeler kapıda.\nÇarşamba: Sosyal bağlantılar size fırsatlar sunuyor.\nPerşembe: Mali konularda dikkatli kararlar alın.\nCuma: Romantik enerji yükseliyor, sevdiklerinize zaman ayırın.\nCumartesi: Dinlenme ve yeniden şarj olma günü.\nPazar: Haftayı değerlendirin ve önümüzdeki hafta için plan yapın.\n\nHaftalık Özet: Bu hafta Koç burcu için harekete geçme ve sonuç alma enerjisi hakim. Mars'ın etkisiyle girişimleriniz güçlü bir ivme kazanıyor. İlişkilerinizde açık iletişim kurun; söylenmeyenler birikmeden önce konuşun. Finansal konularda aceleci davranmaktan kaçının.`,
  "Boğa": `Pazartesi: Haftaya sakin ve kararlı bir başlangıç yapıyorsunuz.\nSalı: Maddi konularda olumlu gelişmeler bekleniyor.\nÇarşamba: Sevdiklerinizle kaliteli zaman geçirin.\nPerşembe: İş hayatında emekleriniz karşılık buluyor.\nCuma: Venüs'ün etkisiyle romantizm ön planda.\nCumartesi: Doğayla buluşun, ruhunuzu besleyin.\nPazar: Gelecek planları yapmak için ideal bir gün.\n\nHaftalık Özet: Boğa için bu hafta sabır ve kararlılığın ödüllendirildiği bir dönem. Venüs'ün etkisiyle hem aşk hem de estetik konularda güzel gelişmeler yaşanabilir. Maddi konularda tutumlu ama akıllıca adımlar atın. Kendinize iyi bakın; sağlıklı beslenme bu hafta özellikle önemli.`,
  "İkizler": `Pazartesi: Zihinsel enerji zirveye çıkıyor, yeni fikirler geliyor.\nSalı: İletişim konularında başarılı bir gün.\nÇarşamba: Sosyal çevreniz genişliyor.\nPerşembe: Öğrenme ve keşif için mükemmel bir gün.\nCuma: Eğlenceli planlar günde için enerji katıyor.\nCumartesi: Yazma, okuma veya yaratıcı aktiviteler için ideal.\nPazar: Dinlenerek zihin gücünüzü yenileyin.\n\nHaftalık Özet: İkizler için bu hafta iletişim ve öğrenmenin ön planda olduğu hareketli bir dönem. Merkür'ün etkisiyle yeni bilgiler edinmek ve insanlarla bağlantı kurmak kolay. Çok fazla işi aynı anda yapmaya çalışmaktan kaçının; odaklanmak bu hafta anahtarınız.`,
  "Yengeç": `Pazartesi: Duygusal sezgileriniz bugün rehberiniz.\nSalı: Aile ve ev konularında güzel gelişmeler.\nÇarşamba: İş hayatında yaratıcılığınızı kullanın.\nPerşembe: Sezgilerinize güvenerek önemli kararlar alın.\nCuma: Sevdiklerinizle sıcak anlar yaşıyorsunuz.\nCumartesi: Kendinize şefkat gösterin ve dinlenin.\nPazar: Ruhsal yenilenme için sessizlik zamanı.\n\nHaftalık Özet: Yengeç için bu hafta duygusal derinlik ve aile bağlarının güçlendiği bir dönem. Ay'ın etkisiyle sezgileriniz keskin; bu içsel rehbere güvenin. Kendinizi fazla zorlamayın ve duygusal sınırlarınızı koruyun. Sevdiklerinize verdiğiniz kadar kendinize de özen gösterin.`,
  "Aslan": `Pazartesi: Haftaya karizmatik bir girişle başlıyorsunuz.\nSalı: Yaratıcı projeler ilerleme kaydediyor.\nÇarşamba: Liderlik yetenekleriniz öne çıkıyor.\nPerşembe: Sosyal hayatınız renkleniyor.\nCuma: Romantik sürprizler günü aydınlatıyor.\nCumartesi: Sevdiklerinizle eğlenceli vakit geçirin.\nPazar: Dinlenerek gelen haftaya güçlü hazırlanın.\n\nHaftalık Özet: Aslan için bu hafta parlamanın ve takdir görmenin zamanı. Güneş'in enerjisiyle özgüveniniz zirveye çıkıyor. Yaratıcı projelerinize yatırım yapın; sonuçlar sizi şaşırtacak. İlişkilerinizde cömert ve sıcakkanlı olun; bu hafta verdiğiniz güzel geri dönüyor.`,
  "Başak": `Pazartesi: Organize bir başlangıçla verimli bir hafta açılıyor.\nSalı: Detaylara verdiğiniz önem takdir görüyor.\nÇarşamba: Sağlık ve rutinler üzerine odaklanın.\nPerşembe: İş projeleri somut ilerleme kaydediyor.\nCuma: Mükemmeliyetçiliği bir kenara bırakıp eğlenin.\nCumartesi: Kendinize iyi bakın, küçük keyifler önemli.\nPazar: Gelecek haftanın planlarını yapın.\n\nHaftalık Özet: Başak için bu hafta verimlilik ve düzenin ön planda olduğu bir dönem. Merkür'ün etkisiyle analitik yetenekleriniz keskin; bunu iş ve kişisel gelişimde kullanın. Mükemmeliyetçiliğiniz bazen sizi bunaltabilir; bu hafta "yeterince iyi" kavramını benimseyin.`,
  "Terazi": `Pazartesi: Denge ve uyum arayışıyla başlıyorsunuz haftaya.\nSalı: İlişkilerde güzel gelişmeler yaşanıyor.\nÇarşamba: Sanatsal aktiviteler size ilham veriyor.\nPerşembe: Önemli kararlar için doğru zaman.\nCuma: Sosyal hayatınız canlılık kazanıyor.\nCumartesi: Güzellik ve estetik konularda kendinize yatırım yapın.\nPazar: Dinlenerek iç dengenizi yenileyin.\n\nHaftalık Özet: Terazi için bu hafta ilişkiler ve denge konularının öne çıktığı güzel bir dönem. Venüs'ün rehberliğinde hem aşk hem de sanatsal ifade konularında fırsatlar doğuyor. Karar vermekte zorlandığınız konularda artık harekete geçme zamanı; kararsızlık sizi geri tutuyor.`,
  "Akrep": `Pazartesi: Derin sezgileriniz bu hafta güçlü bir şekilde çalışıyor.\nSalı: Gizli konular gün yüzüne çıkıyor.\nÇarşamba: Dönüşüm için güçlü bir gün.\nPerşembe: Finansal konularda stratejik adımlar atın.\nCuma: Duygusal bağlarınız güçleniyor.\nCumartesi: Kendinizi yenileme ve dönüşüm için zaman ayırın.\nPazar: Derin iç görüşler için meditasyon yapın.\n\nHaftalık Özet: Akrep için bu hafta derinlik ve dönüşümün zamanı. Plüton'un etkisiyle hayatınızdaki gereksiz şeylerden arınma güçleniyor. İlişkilerinizde dürüstlük ve güven ön planda; yüzeysel bağlantılar yerine derin bağlar kurmaya odaklanın. Mali konularda araştırmacı yaklaşımınız size avantaj sağlıyor.`,
  "Yay": `Pazartesi: Haftaya iyimser ve heyecanlı bir enerjiyle başlıyorsunuz.\nSalı: Yeni öğrenme fırsatları kapıda.\nÇarşamba: Uzak mesafeli bağlantılar size güzel haberler getiriyor.\nPerşembe: Felsefi düşünceler günü renklendiriyor.\nCuma: Macera ve keşif enerjisi yoğunlaşıyor.\nCumartesi: Seyahat veya yeni deneyimler için ideal.\nPazar: Özgür ruhunuzu besleyin.\n\nHaftalık Özet: Yay için bu hafta genişleme ve keşfin zamanı. Jüpiter'in bereketiyle yeni kapılar açılıyor; bu fırsatları değerlendirin. Eğitim, seyahat ve yabancı kültürlerle ilgili konularda olumlu gelişmeler bekleniyor. İlişkilerinizde özgürlüğe duyduğunuz ihtiyacı partnerinizle dürüstçe paylaşın.`,
  "Oğlak": `Pazartesi: Kararlı adımlarla haftaya başlıyorsunuz.\nSalı: Uzun vadeli hedefleriniz netlik kazanıyor.\nÇarşamba: İş hayatında önemli ilerleme.\nPerşembe: Mali konularda akıllıca adımlar atın.\nCuma: Çalışmanın yanı sıra keyif de önemli.\nCumartesi: Sevdiklerinizle kaliteli zaman geçirin.\nPazar: Bir sonraki haftanın stratejisini oluşturun.\n\nHaftalık Özet: Oğlak için bu hafta çalışkanlık ve kararlılığın meyve verdiği bir dönem. Satürn'ün etkisiyle sorumluluk almanız ve uzun vadeli planlar yapmanız destekleniyor. Kariyer hedeflerinizde somut adımlar atacaksınız; yılmadan devam edin. Kendinize de zaman ayırmayı unutmayın; dinlenme de başarının parçası.`,
  "Kova": `Pazartesi: Yenilikçi fikirler haftaya renk katıyor.\nSalı: Sosyal aktivizm ve toplumsal konular ön planda.\nÇarşamba: Teknoloji ve yenilik alanında fırsatlar.\nPerşembe: Arkadaşlık bağları güçleniyor.\nCuma: Orijinal projeler ilgi görüyor.\nCumartesi: Toplulukla vakit geçirmek size enerji veriyor.\nPazar: Gelecek hayalleriniz üzerine düşünün.\n\nHaftalık Özet: Kova için bu hafta yenilik ve toplumsal bağların ön planda olduğu ilham verici bir dönem. Üranüs'ün etkisiyle alışılmışın dışında fikirler ve yaklaşımlar güçleniyor. Arkadaşlık ve grup aktiviteleri bu hafta sizi besliyor. Bireyselliğinizi korurken topluma katkıda bulunma dengenizi iyi kurun.`,
  "Balık": `Pazartesi: Sezgisel bilginiz haftaya yön veriyor.\nSalı: Yaratıcı ve sanatsal projeler gelişiyor.\nÇarşamba: Ruhsal derinlik günü.\nPerşembe: Yardım etme ve şifa verme enerjisi güçlü.\nCuma: Romantik ve duygusal bağlar derinleşiyor.\nCumartesi: Sanatsal ifade ve meditasyon için ideal.\nPazar: Ruhunuzu sessizlik ve huzurla besleyin.\n\nHaftalık Özet: Balık için bu hafta sezgi ve yaratıcılığın zirveye çıktığı mistik bir dönem. Neptün'ün etkisiyle hayal gücünüz ve empati yeteneğiniz çok güçlü. Sanatsal ve ruhsal aktiviteler bu hafta size özel tatmin getirecek. Sınırlarınızı korumayı öğrenin; her acıyı üstlenemezsini.`,
};

const COMPAT_TEXT = {
  "88": "Aynı burcun iki insanı bir araya geldiğinde ortaya çıkan enerji hem büyüleyici hem de zorlayıcı olabilir. Birbirinizi çok iyi anlıyorsunuz çünkü aynı dili konuşuyorsunuz. Güçlü yönleriniz ikiye katlanıyor, ama zayıf yönleriniz de! Birbirinizden öğrenecek çok şeyiniz var.",
  "95": "Bu iki burç arasındaki uyum yıldızlar tarafından özel olarak yazılmış gibi. Birbirinizi tamamlıyorsunuz; güçlü yönleriniz birleşince olağanüstü bir enerji ortaya çıkıyor. Bu ilişkide hem büyüme hem de derin bir anlayış mevcut. Birlikte her şeyin üstesinden gelebilirsiniz.",
  "70": "Aranızdaki bağ güçlü ve kalıcı olmaya elverişli. Farklılıklarınız çatışma değil, zenginlik kaynağı olabilir. Birbirinizi anlamak için çaba gösterdiğinizde ortaya çıkan uyum sizi şaşırtacak. İletişime yatırım yapın; bu ilişki değer.",
  "60": "Her ilişki gibi bu da özveri ve anlayış gerektiriyor. Orta düzeyde uyumunuz var; birbirinizden öğreneceğiniz çok şey var. Sabır ve iletişim ile bu ilişkiyi güçlendirebilirsiniz. Farklılıklarınızı bir engel değil, büyüme fırsatı olarak görün.",
  "40": "Bu kombinasyon zorlu olabilir, ama imkânsız değil. Birbirinizin dünyasını anlamak için ekstra çaba gerekebilir. Güçlü bir bağ kurmak istiyorsanız karşılıklı saygı ve sabır şart. Zorluğun ötesinde derin bir anlayış sizi bekliyor olabilir.",
};

const YESNO_ANSWERS = [
  { answer: "EVET", isYes: true, text: "Evrenin işaretleri olumlu. Yıldızlar bu yolda sizi destekliyor; cesaretinizi toplayın ve adımı atın. İçinizdeki ses de aynı şeyi söylüyor zaten." },
  { answer: "EVET", isYes: true, text: "Bu sorunun cevabı evet, ancak zamanlamanıza dikkat edin. Doğru an çok önemli; aceleci davranmayın ama fırsatı da kaçırmayın." },
  { answer: "HAYIR", isYes: false, text: "Şu an için evren hayır diyor. Bu bir kapının kapanması değil, daha iyi bir şeyin hazırlanması. Sabırla bekleyin; daha güzel bir yol açılacak." },
  { answer: "HAYIR", isYes: false, text: "Yıldızlar bu konuda temkinli olmanızı söylüyor. Şu an ilerlemek yerine geri çekilip durumu yeniden değerlendirmek daha akıllıca olabilir." },
  { answer: "EVET", isYes: true, text: "Kalbiniz zaten cevabı biliyor. Evet, devam edin. Bu adım sizi daha güçlü ve özgür kılacak." },
  { answer: "HAYIR", isYes: false, text: "Evren şu an farklı bir yönü işaret ediyor. Bu cevap hayal kırıklığı yaratsa da, sizi daha uygun bir yola yönlendirmek için geldi." },
];

const RISING_COMBOS = {
  default: (birth, rising) => `⭐ Doğum Burcu × Yükselen Etkisi\n${birth} güneş enerjisi ile ${rising} yükselen enerjisi birleşince içinizde hem güçlü bir öz hem de çevreye yansıttığınız farklı bir kişilik ortaya çıkıyor. Bu iki enerji zaman zaman birbiriyle dans eder, zaman zaman gerilim yaratır; ama her ikisi de sizi siz yapan parçalar.\n\n🌅 Dış Dünyaya Yansıman\nİnsanlar sizi ilk gördüklerinde ${rising} burcunun özelliklerini hisseder; belki karizmatik, belki gizemli, belki sakin. Ancak sizi tanıdıkça asıl doğanız olan ${birth} enerjisi ortaya çıkar.\n\n💫 Güçlü Yanların\nBu kombinasyon size hem içsel derinlik hem de sosyal uyum yeteneği kazandırıyor. İnsanları anlama ve onlara uyum sağlama konusunda güçlüsünüz.\n\n🌑 Dikkat Etmen Gerekenler\nZaman zaman dışarıya yansıttığın ile içinde hissettiklerin arasındaki uçurum yorucu olabilir. Otantik olmaya çalış.\n\n🔮 Senin İçin Mesaj\nİki burcun gücünü taşıyorsun; bu bir yük değil, nadir bir armağan.`,
};

const COMPATIBILITY = {
  "Koç": { best: ["Aslan", "Yay", "İkizler"], ok: ["Kova", "Yengeç"], hard: ["Oğlak", "Terazi"] },
  "Boğa": { best: ["Başak", "Oğlak", "Yengeç"], ok: ["Balık", "Koç"], hard: ["Kova", "Aslan"] },
  "İkizler": { best: ["Terazi", "Kova", "Koç"], ok: ["Aslan", "Yay"], hard: ["Başak", "Balık"] },
  "Yengeç": { best: ["Akrep", "Balık", "Boğa"], ok: ["Başak", "Oğlak"], hard: ["Koç", "Terazi"] },
  "Aslan": { best: ["Koç", "Yay", "İkizler"], ok: ["Terazi", "İkizler"], hard: ["Akrep", "Kova"] },
  "Başak": { best: ["Boğa", "Oğlak", "Yengeç"], ok: ["Akrep", "Balık"], hard: ["İkizler", "Yay"] },
  "Terazi": { best: ["İkizler", "Kova", "Aslan"], ok: ["Koç", "Yengeç"], hard: ["Oğlak", "Balık"] },
  "Akrep": { best: ["Yengeç", "Balık", "Başak"], ok: ["Oğlak", "Boğa"], hard: ["Aslan", "Kova"] },
  "Yay": { best: ["Koç", "Aslan", "Kova"], ok: ["Terazi", "İkizler"], hard: ["Başak", "Boğa"] },
  "Oğlak": { best: ["Boğa", "Başak", "Akrep"], ok: ["Yengeç", "Balık"], hard: ["Koç", "Terazi"] },
  "Kova": { best: ["İkizler", "Terazi", "Yay"], ok: ["Koç", "Yay"], hard: ["Boğa", "Akrep"] },
  "Balık": { best: ["Yengeç", "Akrep", "Başak"], ok: ["Oğlak", "Boğa"], hard: ["İkizler", "Yay"] },
};

const SAME_SIGN_COMPAT = {
  "Koç":     { score: 65, label: "Ateşli Rekabet", emoji: "⚡", color: "#C9A84C", text: "İki Koç bir arada çok enerji ve heyecan yaratır, ama ikisi de lider olmak istediği için çatışmalar kaçınılmaz. Birbirinizi çok iyi anlıyorsunuz, ancak ego savaşlarına dikkat! Saygı ve uzlaşı olursa bu ilişki güçlü olabilir." },
  "Boğa":    { score: 78, label: "Güçlü Uyum", emoji: "💚", color: "#2D8B6E", text: "İki Boğa arasındaki uyum oldukça güçlü. Aynı değerlere, aynı konfor anlayışına ve aynı sadakat beklentisine sahipsiniz. Tek risk: İkiniz de inatçısınız, anlaşmazlıklarda kimse geri adım atmak istemeyebilir." },
  "İkizler": { score: 58, label: "Eğlenceli Kaos", emoji: "🌀", color: "#7B2D8B", text: "İki İkizler bir araya gelince eğlence eksik olmaz ama istikrar zor. İkisi de sürekli değişim ister, bu da ilişkiyi heyecanlı ama karmaşık kılar. Derinleşmek için çaba gerekir." },
  "Yengeç":  { score: 72, label: "Derin Bağ", emoji: "💙", color: "#2D5F8B", text: "İki Yengeç birbirini derinden anlayabilir çünkü aynı duygusal dili konuşurlar. Ancak iki hassas ruh bir arada olunca duygusal yoğunluk bazen boğucu olabilir. Birbirinize güvenli alan yaratın." },
  "Aslan":   { score: 52, label: "Dikkat Gerekli", emoji: "👑", color: "#8B5E2D", text: "İki Aslan aynı sahnede parlamak ister. Birbirinize hayranlık duyabilirsiniz ama ikisi de ilgi merkezi olmak istediği için rekabet kaçınılmaz. Ego bir kenara bırakılırsa muhteşem bir güç çifti olunabilir." },
  "Başak":   { score: 80, label: "Mükemmel Düzen", emoji: "✨", color: "#C9956C", text: "İki Başak birlikte son derece uyumlu ve verimli olabilir. Aynı titizliğe, aynı standartlara sahipsiniz. Tek risk: İkisi de eleştirici olduğu için küçük şeyler büyük sorunlara dönüşebilir." },
  "Terazi":  { score: 70, label: "Zarif Uyum", emoji: "⚖️", color: "#C9A84C", text: "İki Terazi birlikte güzel ve uyumlu bir ilişki kurabilir. Barışçıl yapınız çatışmaları önler. Ancak ikisi de karar vermekte zorlandığı için önemli konular ertelenebilir; bu ilişkide biri karar almalı." },
  "Akrep":   { score: 48, label: "Yoğun Gerilim", emoji: "🔥", color: "#8B2D2D", text: "İki Akrep bir araya gelince yoğunluk tavan yapar. Derin bir anlayış ve tutku olabilir ama ikisi de kontrol etmek ve güç sahibi olmak istediği için ciddi çatışmalar yaşanabilir. Güven şarttır." },
  "Yay":     { score: 63, label: "Özgür Ruhlar", emoji: "🏹", color: "#7B2D8B", text: "İki Yay birlikte harika maceralar yaşar ve birbirini kısıtlamaz. Özgürlük ihtiyacınızı anlayan tek kişi yine kendiniz! Ancak ikisi de bağlılıktan kaçtığı için ilişkiyi derinleştirmek zaman alabilir." },
  "Oğlak":   { score: 75, label: "Güçlü Temel", emoji: "🏔️", color: "#2D8B6E", text: "İki Oğlak aynı hedeflere, aynı çalışkanlığa ve aynı kararlılığa sahip. Bu ilişki sağlam temeller üzerine kurulur. Dikkat edilmesi gereken tek şey: İkisi de duygularını ifade etmekte zorlanır; his paylaşımına önem verin." },
  "Kova":    { score: 66, label: "Zihin Ortaklığı", emoji: "🌊", color: "#2D5F8B", text: "İki Kova entelektüel uyum konusunda mükemmel. Fikirleriniz, hayalleriniz örtüşüyor. Ancak ikisi de duygusal mesafe koyma eğiliminde olduğu için derin bir yakınlık kurmak için ekstra çaba gerekebilir." },
  "Balık":   { score: 60, label: "Rüya Dünyası", emoji: "🔮", color: "#7B2D8B", text: "İki Balık birlikte çok romantik ve ruhsal bir bağ kurabilir. Ancak ikisi de hayalperest olduğu için pratik yaşam konularında zorlanabilirler. Birbirinizi gerçekliğe bağlayacak denge önemli." },
};

function getCompatibilityScore(s1, s2) {
  if (!s1 || !s2) return null;
  if (s1.name === s2.name) {
    const d = SAME_SIGN_COMPAT[s1.name];
    return { score: d.score, label: d.label, emoji: d.emoji, color: d.color, key: "same", sameText: d.text };
  }
  const c = COMPATIBILITY[s1.name];
  if (c.best.includes(s2.name)) return { score: 95, label: "Mükemmel Uyum", emoji: "💞", color: "#C9956C", key: "95" };
  if (c.ok.includes(s2.name)) return { score: 70, label: "İyi Uyum", emoji: "💛", color: "#C9A84C", key: "70" };
  if (c.hard.includes(s2.name)) return { score: 40, label: "Zorlu İlişki", emoji: "⚡", color: "#8B2D2D", key: "40" };
  return { score: 60, label: "Orta Uyum", emoji: "🤝", color: "#7B2D8B", key: "60" };
}

function Stars({ dark }) {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 5,
  }));
  if (!dark) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "white", opacity: 0.4,
          animation: `twinkle ${3 + s.delay}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("home");
  const [selectedSign, setSelectedSign] = useState(null);
  const [view, setView] = useState("grid");
  const [activeResultTab, setActiveResultTab] = useState("daily");
  const [luckData, setLuckData] = useState(null);
  const [dailyIndex, setDailyIndex] = useState(0);

  const [sign1, setSign1] = useState(null);
  const [sign2, setSign2] = useState(null);
  const [compat, setCompat] = useState(null);

  const [yesNoQ, setYesNoQ] = useState("");
  const [yesNoResult, setYesNoResult] = useState(null);

  const [risingBirthSign, setRisingBirthSign] = useState(null);
  const [birthHour, setBirthHour] = useState("");
  const [birthMinute, setBirthMinute] = useState("00");
  const [risingSign, setRisingSign] = useState(null);
  const [risingReading, setRisingReading] = useState("");

  const today = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  const th = {
    bg: dark ? "#0D0918" : "#F5F0FF",
    card: dark ? "rgba(255,255,255,0.06)" : "rgba(123,45,139,0.07)",
    border: dark ? "rgba(201,149,108,0.25)" : "rgba(123,45,139,0.2)",
    text: dark ? "#EDE0D4" : "#1E0E2E",
    sub: dark ? "rgba(237,224,212,0.55)" : "rgba(30,14,46,0.55)",
    accent: dark ? "#C9956C" : "#8B3FA8",
    purple: dark ? "#9B4DBB" : "#6B1F8B",
    tabBg: dark ? "rgba(13,9,24,0.97)" : "rgba(245,240,255,0.97)",
    inputBg: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
    placeholder: dark ? "rgba(237,224,212,0.3)" : "rgba(30,14,46,0.35)",
  };

  function generateLuck() {
    const num = Math.floor(Math.random() * 99) + 1;
    const color = LUCK_COLORS[Math.floor(Math.random() * LUCK_COLORS.length)];
    return { num, color };
  }

  function openSign(sign) {
    setSelectedSign(sign);
    setView("result");
    setActiveResultTab("daily");
    setLuckData(generateLuck());
    setDailyIndex(Math.floor(Math.random() * (DAILY[sign.name]?.length || 1)));
  }

  function calcRisingSign(birthSign, hour) {
    const signIndex = SIGNS.findIndex(s => s.name === birthSign.name);
    const offset = Math.floor(parseInt(hour) / 2);
    return SIGNS[(signIndex + offset) % 12];
  }

  function getRisingReading() {
    if (!risingBirthSign || birthHour === "") return;
    const rising = calcRisingSign(risingBirthSign, birthHour);
    setRisingSign(rising);
    setRisingReading(RISING_COMBOS.default(risingBirthSign.name, rising.name));
  }

  function askYesNo() {
    if (!yesNoQ.trim()) return;
    const r = YESNO_ANSWERS[Math.floor(Math.random() * YESNO_ANSWERS.length)];
    setYesNoResult(r);
  }

  function checkCompatibility() {
    if (!sign1 || !sign2) return;
    setCompat(getCompatibilityScore(sign1, sign2));
  }

  const tabs = [
    { id: "home", icon: "✦", label: "Burçlar" },
    { id: "compat", icon: "♾", label: "Uyum" },
    { id: "yesno", icon: "🔮", label: "Fal" },
    { id: "rising", icon: "🌅", label: "Yükselen" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${th.bg}; transition: background 0.4s; }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.8} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes glow { 0%,100%{opacity:0.7} 50%{opacity:1} }
        .sign-pill:hover { transform: translateY(-2px) scale(1.04); }
        textarea:focus, input:focus { outline: none; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        textarea::placeholder { color: ${th.placeholder}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,149,108,0.3); border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: th.bg, color: th.text, fontFamily: "'Jost', sans-serif", position: "relative", transition: "background 0.4s" }}>
        <Stars dark={dark} />
        <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", position: "relative", zIndex: 1, paddingBottom: 80 }}>

          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 0" }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: th.accent, letterSpacing: "0.08em" }}>KUBER BURÇLAR</h1>
              <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.2em", textTransform: "uppercase" }}>{today}</p>
            </div>
            <button onClick={() => setDark(!dark)} style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 20, padding: "8px 14px", cursor: "pointer", color: th.text, fontSize: 16 }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          {/* HOME */}
          {tab === "home" && (
            <>
              {view === "grid" && (
                <div style={{ animation: "fadeUp 0.5s ease", padding: "24px 16px 0" }}>
                  <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <div style={{ fontSize: 48, marginBottom: 8, animation: "glow 3s ease-in-out infinite" }}>✦</div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: th.sub }}>Burcunu seç, yıldızların rehberliğine bak</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                    {SIGNS.map((s, i) => (
                      <div key={s.name} className="sign-pill" onClick={() => openSign(s)} style={{
                        background: th.card, border: `1px solid ${th.border}`, borderRadius: 18,
                        padding: "18px 8px", textAlign: "center", cursor: "pointer",
                        transition: "transform 0.2s ease", animation: `fadeUp 0.4s ease ${i * 0.04}s both`,
                      }}>
                        <div style={{ fontSize: 28, marginBottom: 5 }}>{s.symbol}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: th.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.name}</div>
                        <div style={{ fontSize: 9, color: th.sub, marginTop: 3 }}>{s.dates}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "result" && selectedSign && (
                <div style={{ animation: "fadeUp 0.5s ease" }}>
                  <div style={{ padding: "16px 20px 0" }}>
                    <button onClick={() => setView("grid")} style={{ background: "none", border: "none", cursor: "pointer", color: th.sub, fontSize: 13, fontFamily: "'Jost', sans-serif" }}>← Geri</button>
                  </div>
                  <div style={{ textAlign: "center", padding: "20px 24px 16px" }}>
                    <div style={{ fontSize: 64, marginBottom: 8, filter: "drop-shadow(0 0 20px rgba(201,149,108,0.4))" }}>{selectedSign.symbol}</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: th.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{selectedSign.name}</h2>
                    <p style={{ fontSize: 12, color: th.sub, marginTop: 4 }}>{selectedSign.element} Burcu · {selectedSign.dates}</p>
                  </div>

                  {luckData && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "0 16px 16px" }}>
                      {[
                        { label: "Şans Sayısı", value: luckData.num, icon: "🔢" },
                        { label: "Şans Rengi", value: luckData.color.name, icon: luckData.color.emoji },
                        { label: "Şans Taşı", value: selectedSign.stone, icon: selectedSign.stoneEmoji },
                      ].map(c => (
                        <div key={c.label} style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 14, padding: "12px 8px", textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{c.icon}</div>
                          <div style={{ fontSize: 10, fontWeight: 500, color: th.accent, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
                          <div style={{ fontSize: 12, color: th.text, fontFamily: "'Playfair Display', serif" }}>{c.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8, padding: "0 16px 16px" }}>
                    {[{ id: "daily", label: "Günlük" }, { id: "weekly", label: "Haftalık" }].map(t => (
                      <button key={t.id} onClick={() => setActiveResultTab(t.id)} style={{
                        flex: 1, padding: "10px", borderRadius: 12, cursor: "pointer",
                        border: `1px solid ${activeResultTab === t.id ? th.accent : th.border}`,
                        background: activeResultTab === t.id ? `rgba(201,149,108,0.15)` : th.card,
                        color: activeResultTab === t.id ? th.accent : th.sub,
                        fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 500, transition: "all 0.2s",
                      }}>{t.label}</button>
                    ))}
                  </div>

                  <div style={{ padding: "0 16px" }}>
                    <div style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 20, padding: "24px 18px", fontSize: 15, lineHeight: 1.9, color: th.text, whiteSpace: "pre-wrap", animation: "scaleIn 0.4s ease" }}>
                      {activeResultTab === "daily"
                        ? (DAILY[selectedSign.name]?.[dailyIndex] || "Yorum bulunamadı.")
                        : (WEEKLY[selectedSign.name] || "Yorum bulunamadı.")}
                    </div>
                    <div style={{ textAlign: "center", marginTop: 16 }}>
                      <button onClick={() => { setLuckData(generateLuck()); setDailyIndex(prev => (prev + 1) % (DAILY[selectedSign.name]?.length || 1)); }} style={{
                        background: "none", border: `1px solid ${th.border}`, borderRadius: 30,
                        padding: "10px 24px", cursor: "pointer", color: th.accent, fontSize: 13,
                        letterSpacing: "0.1em", fontFamily: "'Jost', sans-serif",
                      }}>✦ Yenile</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* UYUMLULUK */}
          {tab === "compat" && (
            <div style={{ padding: "24px 16px 0", animation: "fadeUp 0.5s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>♾</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: th.accent }}>Burç Uyumu</h2>
                <p style={{ fontSize: 13, color: th.sub, marginTop: 6, fontStyle: "italic" }}>İki burç seç, uyumunu gör</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[{ label: "Birinci Burç", val: sign1 }, { label: "İkinci Burç", val: sign2 }].map(({ label, val }) => (
                  <div key={label}>
                    <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>{label}</p>
                    <div style={{ background: th.card, border: `1px solid ${val ? th.accent : th.border}`, borderRadius: 14, padding: "12px", textAlign: "center", minHeight: 70, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                      {val ? (<><div style={{ fontSize: 28 }}>{val.symbol}</div><div style={{ fontSize: 12, color: th.accent, fontFamily: "'Playfair Display', serif", marginTop: 4, textTransform: "uppercase" }}>{val.name}</div></>) : (<p style={{ fontSize: 12, color: th.sub }}>Seç ↓</p>)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 20 }}>
                {SIGNS.map(s => (
                  <button key={s.name} onClick={() => {
                    if (!sign1) { setSign1(s); setCompat(null); }
                    else if (!sign2) { setSign2(s); setCompat(null); }
                    else if (sign1 && sign2) { setSign1(s); setSign2(null); setCompat(null); }
                  }} style={{
                    background: (sign1 === s || sign2 === s) ? `rgba(201,149,108,0.2)` : th.card,
                    border: `1px solid ${(sign1 === s || sign2 === s) ? th.accent : th.border}`,
                    borderRadius: 10, padding: "8px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 18 }}>{s.symbol}</div>
                    <div style={{ fontSize: 8, color: th.sub, marginTop: 2, textTransform: "uppercase" }}>{s.name}</div>
                  </button>
                ))}
              </div>

              {sign1 && sign2 && (
                <button onClick={checkCompatibility} style={{
                  width: "100%", padding: "14px", borderRadius: 14, cursor: "pointer",
                  background: `linear-gradient(135deg, ${th.purple}, #C9956C)`,
                  border: "none", color: "white", fontSize: 15, fontFamily: "'Jost', sans-serif",
                  fontWeight: 500, marginBottom: 20,
                }}>✦ Uyumu Hesapla</button>
              )}

              {compat && (
                <div style={{ animation: "scaleIn 0.4s ease" }}>
                  <div style={{ background: th.card, border: `1px solid ${compat.color}`, borderRadius: 20, padding: "24px", textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{compat.emoji}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: compat.color, marginBottom: 8 }}>{compat.label}</div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} style={{ width: 24, height: 6, borderRadius: 3, background: i < Math.round(compat.score / 10) ? compat.color : `rgba(201,149,108,0.15)` }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 13, color: th.sub }}>%{compat.score} Uyum</div>
                  </div>
                  <div style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 16, padding: "18px", fontSize: 14, lineHeight: 1.85, color: th.text, fontStyle: "italic" }}>
                    {compat.key === "same" ? compat.sameText : (COMPAT_TEXT[String(compat.score)] || COMPAT_TEXT["60"])}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EVET/HAYIR */}
          {tab === "yesno" && (
            <div style={{ padding: "24px 16px 0", animation: "fadeUp 0.5s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🔮</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: th.accent }}>Evren'e Sor</h2>
                <p style={{ fontSize: 13, color: th.sub, marginTop: 6, fontStyle: "italic" }}>Aklındaki soruyu yaz, mistik cevabı al</p>
              </div>
              <textarea value={yesNoQ} onChange={e => { setYesNoQ(e.target.value); setYesNoResult(null); }} placeholder="Sorunuzu buraya yazın... (örn: Bu işi kabul etmeli miyim?)" style={{ width: "100%", minHeight: 100, padding: "16px", background: th.inputBg, border: `1px solid ${th.border}`, borderRadius: 16, color: th.text, fontSize: 14, lineHeight: 1.7, fontFamily: "'Jost', sans-serif", resize: "none" }} />
              <button onClick={askYesNo} disabled={!yesNoQ.trim()} style={{
                width: "100%", padding: "14px", borderRadius: 14, cursor: "pointer",
                background: yesNoQ.trim() ? `linear-gradient(135deg, ${th.purple}, #C9956C)` : th.card,
                border: `1px solid ${yesNoQ.trim() ? "transparent" : th.border}`,
                color: yesNoQ.trim() ? "white" : th.sub,
                fontSize: 15, fontFamily: "'Jost', sans-serif", fontWeight: 500, marginTop: 12, transition: "all 0.3s",
              }}>🔮 Cevabı Göster</button>

              {yesNoResult && (
                <div style={{ marginTop: 20, animation: "scaleIn 0.5s ease", background: th.card, border: `1px solid ${yesNoResult.isYes ? "#2D8B6E" : "#8B2D2D"}`, borderRadius: 20, padding: "28px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 60, marginBottom: 12 }}>{yesNoResult.isYes ? "✅" : "❌"}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: yesNoResult.isYes ? "#4CAF82" : "#CF6679", letterSpacing: "0.1em", marginBottom: 16 }}>{yesNoResult.answer}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: th.text, fontStyle: "italic" }}>{yesNoResult.text}</p>
                  <button onClick={() => { setYesNoResult(null); setYesNoQ(""); }} style={{ marginTop: 16, background: "none", border: `1px solid ${th.border}`, borderRadius: 20, padding: "8px 20px", cursor: "pointer", color: th.sub, fontSize: 12, fontFamily: "'Jost', sans-serif" }}>Yeni Soru Sor</button>
                </div>
              )}
            </div>
          )}

          {/* YÜKSELen */}
          {tab === "rising" && (
            <div style={{ padding: "24px 16px 0", animation: "fadeUp 0.5s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🌅</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: th.accent }}>Yükselen Burcun</h2>
                <p style={{ fontSize: 13, color: th.sub, marginTop: 6, fontStyle: "italic" }}>Doğum burcu + saatini gir, yükseleni keşfet</p>
              </div>

              <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>1. Doğum Burcunu Seç</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 20 }}>
                {SIGNS.map(s => (
                  <button key={s.name} onClick={() => { setRisingBirthSign(s); setRisingSign(null); setRisingReading(""); }} style={{
                    background: risingBirthSign === s ? `rgba(201,149,108,0.2)` : th.card,
                    border: `1px solid ${risingBirthSign === s ? th.accent : th.border}`,
                    borderRadius: 10, padding: "8px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 18 }}>{s.symbol}</div>
                    <div style={{ fontSize: 8, color: risingBirthSign === s ? th.accent : th.sub, marginTop: 2, textTransform: "uppercase" }}>{s.name}</div>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>2. Doğum Saatini Gir</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                {[{ label: "Saat (0-23)", val: birthHour, set: setBirthHour, max: 23, ph: "14" }, { label: "Dakika (0-59)", val: birthMinute, set: setBirthMinute, max: 59, ph: "30" }].map((f, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, color: th.sub, marginBottom: 6 }}>{f.label}</p>
                    <input type="number" min="0" max={f.max} placeholder={`ör: ${f.ph}`} value={f.val}
                      onChange={e => { f.set(e.target.value); setRisingSign(null); setRisingReading(""); }}
                      style={{ width: "100%", padding: "12px 14px", background: th.inputBg, border: `1px solid ${th.border}`, borderRadius: 12, color: th.text, fontSize: 16, fontFamily: "'Jost', sans-serif", textAlign: "center" }} />
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: th.sub, fontStyle: "italic", marginBottom: 20, textAlign: "center" }}>💡 Doğum saatini bilmiyorsan nüfus cüzdanına bakabilirsin</p>

              <button onClick={getRisingReading} disabled={!risingBirthSign || birthHour === ""} style={{
                width: "100%", padding: "14px", borderRadius: 14, cursor: "pointer",
                background: risingBirthSign && birthHour !== "" ? `linear-gradient(135deg, #1a0a2e, #C9956C)` : th.card,
                border: `1px solid ${risingBirthSign && birthHour !== "" ? "transparent" : th.border}`,
                color: risingBirthSign && birthHour !== "" ? "white" : th.sub,
                fontSize: 15, fontFamily: "'Jost', sans-serif", fontWeight: 500, marginBottom: 20, transition: "all 0.3s",
              }}>🌅 Yükseleni Hesapla</button>

              {risingSign && risingReading && (
                <div style={{ animation: "scaleIn 0.5s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16, background: th.card, border: `1px solid ${th.border}`, borderRadius: 20, padding: "20px" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 36 }}>{risingBirthSign.symbol}</div>
                      <div style={{ fontSize: 10, color: th.sub, marginTop: 4, textTransform: "uppercase" }}>Doğum</div>
                      <div style={{ fontSize: 12, color: th.accent, fontFamily: "'Playfair Display', serif", fontWeight: 700, textTransform: "uppercase" }}>{risingBirthSign.name}</div>
                    </div>
                    <div style={{ fontSize: 22, color: th.sub }}>×</div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 36 }}>{risingSign.symbol}</div>
                      <div style={{ fontSize: 10, color: th.sub, marginTop: 4, textTransform: "uppercase" }}>Yükselen</div>
                      <div style={{ fontSize: 12, color: th.accent, fontFamily: "'Playfair Display', serif", fontWeight: 700, textTransform: "uppercase" }}>{risingSign.name}</div>
                    </div>
                  </div>
                  <div style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 20, padding: "22px 18px", fontSize: 15, lineHeight: 1.9, color: th.text, whiteSpace: "pre-wrap", marginBottom: 16 }}>{risingReading}</div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Nav */}
          <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: th.tabBg, borderTop: `1px solid ${th.border}`, backdropFilter: "blur(20px)", display: "flex", padding: "10px 0 20px" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "home") setView("grid"); }} style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                opacity: tab === t.id ? 1 : 0.4, transition: "opacity 0.2s",
              }}>
                <span style={{ fontSize: 20, color: tab === t.id ? th.accent : th.text }}>{t.icon}</span>
                <span style={{ fontSize: 10, color: tab === t.id ? th.accent : th.sub, letterSpacing: "0.08em", fontWeight: 500 }}>{t.label}</span>
                {tab === t.id && <div style={{ width: 20, height: 2, background: th.accent, borderRadius: 1 }} />}
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
