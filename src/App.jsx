import { useState, useRef } from "react";

const SIGNS = [
  { name: "Koç", en: "Aries", symbol: "♈", dates: "21 Mar – 19 Nis", element: "Ateş", stone: "Kırmızı Akik", stoneEmoji: "🔴", color: "#C0392B" },
  { name: "Boğa", en: "Taurus", symbol: "♉", dates: "20 Nis – 20 May", element: "Toprak", stone: "Zümrüt", stoneEmoji: "💚", color: "#27AE60" },
  { name: "İkizler", en: "Gemini", symbol: "♊", dates: "21 May – 20 Haz", element: "Hava", stone: "Akvamarin", stoneEmoji: "🔵", color: "#2980B9" },
  { name: "Yengeç", en: "Cancer", symbol: "♋", dates: "21 Haz – 22 Tem", element: "Su", stone: "İnci", stoneEmoji: "⚪", color: "#8E44AD" },
  { name: "Aslan", en: "Leo", symbol: "♌", dates: "23 Tem – 22 Ağu", element: "Ateş", stone: "Altın Topaz", stoneEmoji: "🟡", color: "#D4A017" },
  { name: "Başak", en: "Virgo", symbol: "♍", dates: "23 Ağu – 22 Eyl", element: "Toprak", stone: "Yeşim", stoneEmoji: "💚", color: "#16A085" },
  { name: "Terazi", en: "Libra", symbol: "♎", dates: "23 Eyl – 22 Eki", element: "Hava", stone: "Opal", stoneEmoji: "🌈", color: "#E91E63" },
  { name: "Akrep", en: "Scorpio", symbol: "♏", dates: "23 Eki – 21 Kas", element: "Su", stone: "Obsidyen", stoneEmoji: "⚫", color: "#6C3483" },
  { name: "Yay", en: "Sagittarius", symbol: "♐", dates: "22 Kas – 21 Ara", element: "Ateş", stone: "Turkuaz", stoneEmoji: "🩵", color: "#E67E22" },
  { name: "Oğlak", en: "Capricorn", symbol: "♑", dates: "22 Ara – 19 Oca", element: "Toprak", stone: "Oniks", stoneEmoji: "🖤", color: "#566573" },
  { name: "Kova", en: "Aquarius", symbol: "♒", dates: "20 Oca – 18 Şub", element: "Hava", stone: "Ametist", stoneEmoji: "💜", color: "#1ABC9C" },
  { name: "Balık", en: "Pisces", symbol: "♓", dates: "19 Şub – 20 Mar", element: "Su", stone: "Aytaşı", stoneEmoji: "🔮", color: "#5DADE2" },
];

const LUCK_COLORS = [
  { name: "Derin Mor", emoji: "💜" }, { name: "Gül Altını", emoji: "🌹" },
  { name: "Zümrüt Yeşili", emoji: "💚" }, { name: "Safir Mavisi", emoji: "💙" },
  { name: "Yakut Kırmızısı", emoji: "❤️" }, { name: "Altın Sarısı", emoji: "✨" },
  { name: "Gümüş", emoji: "🩶" }, { name: "Buz Mavisi", emoji: "🩵" },
];

const DAILY = {
  "Koç": [
    `🌟 Genel Enerji\nBugün Mars'ın güçlü etkisiyle içinizdeki ateş her zamankinden daha parlak yanıyor. Yeni başlangıçlar için mükemmel bir gün; ertelediklerinizi hayata geçirme vakti geldi.\n\n❤️ Aşk & İlişkiler\nPartneriyle geçirilen kaliteli zaman bugün çok değerli. Duygularınızı açıkça ifade etmekten çekinmeyin.\n\n💼 Kariyer & Para\nİş hayatında öne çıkma fırsatı doğuyor. Mali konularda aceleci kararlardan kaçının.\n\n🌿 Sağlık & Enerji\nFiziksel enerji yüksek ama stresi yönetmeye dikkat edin.\n\n🔮 Günün Mesajı\nCesaretin içinde zaten var — sadece kullanmayı seç.`,
    `🌟 Genel Enerji\nYıldızlar bugün sizi aktif ve dinamik bir güne yönlendiriyor. Önünüze çıkan fırsatları değerlendirin.\n\n❤️ Aşk & İlişkiler\nSevdiklerinizle ara açılmışsa bugün köprü kurma zamanı.\n\n💼 Kariyer & Para\nYeni bir proje kapıda olabilir. Gelen teklifleri dikkatlice değerlendirin.\n\n🌿 Sağlık & Enerji\nEnerjinizi yaratıcı bir aktiviteye yönlendirin.\n\n🔮 Günün Mesajı\nHarekete geçmek için doğru zaman hep şimdiki andır.`,
  ],
  "Boğa": [
    `🌟 Genel Enerji\nVenüs'ün rehberliğinde bugün konfor ve güzelliğe yöneliyor ruhunuz. Sabırlı adımlarla ilerlemeye devam edin.\n\n❤️ Aşk & İlişkiler\nDerin ve kalıcı bağlar kurma konusunda yeteneğiniz bugün parılıyor.\n\n💼 Kariyer & Para\nMaddi konularda dikkatli ama umut verici bir gün.\n\n🌿 Sağlık & Enerji\nDoğayla iç içe geçirilen zaman ruhunuzu besleyecek.\n\n🔮 Günün Mesajı\nSabır; en güzel meyvelerin olgunlaşması için zamana ihtiyaç duyduğunu unutma.`,
    `🌟 Genel Enerji\nBugün toprak enerjisi sizi sakinleştiriyor. Pratik adımlar atın, hayallerinizi somutlaştırın.\n\n❤️ Aşk & İlişkiler\nSevdiklerinize güven verin; bu onlar için en değerli hediyedir.\n\n💼 Kariyer & Para\nEmeklerinizin karşılığını almaya başlıyorsunuz.\n\n🌿 Sağlık & Enerji\nZihninizi dinlendirmek için sessizliğe çekilin.\n\n🔮 Günün Mesajı\nKökleriniz ne kadar derinse, yükseliş o kadar güçlü olur.`,
  ],
  "İkizler": [
    `🌟 Genel Enerji\nMerkür'ün etkisiyle zihniniz bugün pırıl pırıl. Yeni fikirler peş peşe geliyor.\n\n❤️ Aşk & İlişkiler\nSözlerinizin gücünü kullanın; içtenlikle söylenen birkaç cümle ilişkinizi dönüştürebilir.\n\n💼 Kariyer & Para\nYaratıcı fikirleriniz takdir görüyor.\n\n🌿 Sağlık & Enerji\nZihninizi dinlendirin; çok fazla düşünmek yorgunluğa yol açabilir.\n\n🔮 Günün Mesajı\nİki yol göründüğünde, ikisini de denemekten korkmayan sensin.`,
    `🌟 Genel Enerji\nBugün merakınız sizi heyecan verici yerlere götürüyor.\n\n❤️ Aşk & İlişkiler\nEğlenceli bir enerji var çevrenizde; sevdiğinizle güzel anlar yaratın.\n\n💼 Kariyer & Para\nÇoklu görevlerde başarılı olduğunuzu kanıtlama fırsatınız var.\n\n🌿 Sağlık & Enerji\nNefes egzersizleri zihninizi sakinleştirecek.\n\n🔮 Günün Mesajı\nMerak, hayatın en güzel pusulasıdır.`,
  ],
  "Yengeç": [
    `🌟 Genel Enerji\nAy'ın çocuğu olarak bugün duygusal derinliğiniz bir güç kaynağına dönüşüyor. Sezgilerinize güvenin.\n\n❤️ Aşk & İlişkiler\nDuygusal yakınlık bugün ön planda.\n\n💼 Kariyer & Para\nEkip çalışmasında öne çıkan bir gün.\n\n🌿 Sağlık & Enerji\nDuygusal dengenizi korumak için kendinize zaman ayırın.\n\n🔮 Günün Mesajı\nKalbin bilgeliği, aklın hesapladığından çok daha derine uzanır.`,
    `🌟 Genel Enerji\nBugün koruyucu ve şefkatli enerjiniz etrafınızdakilere ışık saçıyor.\n\n❤️ Aşk & İlişkiler\nSevdiklerinizi koruyan kalkanınız bugün daha da güçlü hissettiriyor.\n\n💼 Kariyer & Para\nSezgisel kararlar bugün sizi doğru yöne götürüyor.\n\n🌿 Sağlık & Enerji\nSuya dokunmak ruhunuzu yenileyecek.\n\n🔮 Günün Mesajı\nEn derin sevgi, önce kendine gösterdiğin sevgiden doğar.`,
  ],
  "Aslan": [
    `🌟 Genel Enerji\nGüneş'in çocuğu bugün sahnede! Karizmanız ve özgüveniniz çevrenizdekileri büyülüyor.\n\n❤️ Aşk & İlişkiler\nRomantik enerji yüksek; partneriyle kaliteli zaman geçirmek için ideal bir gün.\n\n💼 Kariyer & Para\nLiderlik yetenekleriniz ön plana çıkıyor.\n\n🌿 Sağlık & Enerji\nEnerji bolluğunuzu yaratıcı bir hobiye kanalize edin.\n\n🔮 Günün Mesajı\nAsıl güç, parlamaktan değil; başkalarını da parlatmaktan gelir.`,
    `🌟 Genel Enerji\nBugün içinizdeki kral ya da kraliçe uyandı. Kendinize inanın.\n\n❤️ Aşk & İlişkiler\nCömertliğiniz ilişkinize renk katıyor.\n\n💼 Kariyer & Para\nFikirleriniz bugün altın değerinde.\n\n🌿 Sağlık & Enerji\nGüneş ışığı altında zaman geçirmek size enerji verecek.\n\n🔮 Günün Mesajı\nIşığını gizleme; dünya seni görmek istiyor.`,
  ],
  "Başak": [
    `🌟 Genel Enerji\nMerkür'ün analitik enerjisiyle bugün her detayı görüyor ve anlıyorsunuz.\n\n❤️ Aşk & İlişkiler\nKüçük jestler büyük anlam taşıyor.\n\n💼 Kariyer & Para\nDetaylara verdiğiniz önem bir projeyi mükemmel sonuca taşıyor.\n\n🌿 Sağlık & Enerji\nSağlıklı beslenme bugün önceliğiniz olsun.\n\n🔮 Günün Mesajı\nMükemmellik, her adımda gösterilen özenin doğal sonucudur.`,
    `🌟 Genel Enerji\nBugün organize ve verimli bir gün sizi bekliyor.\n\n❤️ Aşk & İlişkiler\nPratik sevgi gösterileri ilişkinizi güçlendiriyor.\n\n💼 Kariyer & Para\nSistematik çalışmanız bugün somut sonuçlar doğuruyor.\n\n🌿 Sağlık & Enerji\nZihninizi boşaltmak için günlük tutun.\n\n🔮 Günün Mesajı\nHer büyük şey, küçük ve düzenli adımlarla inşa edilir.`,
  ],
  "Terazi": [
    `🌟 Genel Enerji\nVenüs'ün zarafetini taşıyan bugün, denge ve uyumu aramanızı destekliyor.\n\n❤️ Aşk & İlişkiler\nRomantik atmosfer bugün doruğa ulaşıyor.\n\n💼 Kariyer & Para\nMüzakere gerektiren konularda başarılı olacaksınız.\n\n🌿 Sağlık & Enerji\nYoga veya meditasyon deneyin.\n\n🔮 Günün Mesajı\nHer şeyin bir dengesi vardır; o dengeyi bulmak senin sanatındır.`,
    `🌟 Genel Enerji\nBugün adalet ve dürüstlük ön planda.\n\n❤️ Aşk & İlişkiler\nİlişkinizdeki dengesizlikleri bugün nazikçe ele alın.\n\n💼 Kariyer & Para\nEkip içindeki uyumu sağlama konusunda kilit rol oynuyorsunuz.\n\n🌿 Sağlık & Enerji\nGüzel müzik dinlemek ruhunuzu besleyecek.\n\n🔮 Günün Mesajı\nDenge, durağanlık değil; sürekli bir uyum dansıdır.`,
  ],
  "Akrep": [
    `🌟 Genel Enerji\nPlüton'un derin enerjisiyle bugün yüzeyin altındaki gerçekleri görüyorsunuz.\n\n❤️ Aşk & İlişkiler\nDerin ve yoğun duygular bugün yüzeye çıkıyor.\n\n💼 Kariyer & Para\nAraştırma gerektiren işlerde bugün zirvedesiniz.\n\n🌿 Sağlık & Enerji\nDuygusal detoks için bir şeyleri yazmak faydalı olacak.\n\n🔮 Günün Mesajı\nKaranlık, ışığın ne kadar güçlü olduğunu anlamak için vardır.`,
    `🌟 Genel Enerji\nBugün dönüşüm enerjisi güçlü.\n\n❤️ Aşk & İlişkiler\nGüven, ilişkinizin temeli. Bugün bu temeli pekiştirin.\n\n💼 Kariyer & Para\nStratejik düşünceniz sizi öne geçiriyor.\n\n🌿 Sağlık & Enerji\nDerin nefes egzersizleri içinizdeki gerilimi serbest bırakacak.\n\n🔮 Günün Mesajı\nEn büyük güç, kendini yeniden icat etme cesaretinden gelir.`,
  ],
  "Yay": [
    `🌟 Genel Enerji\nJüpiter'in bolluğuyla bugün ufuklar genişliyor. Özgürlük ruhunuz canlanıyor.\n\n❤️ Aşk & İlişkiler\nEğlenceli ve macera dolu anlar ilişkinize taze hava katıyor.\n\n💼 Kariyer & Para\nUzak mesafeli bağlantılar bugün şanslı.\n\n🌿 Sağlık & Enerji\nAçık havada spor ruhunuzu özgürleştirecek.\n\n🔮 Günün Mesajı\nOkun hedefe ulaşması için önce geriye çekilmesi gerekir.`,
    `🌟 Genel Enerji\nBugün felsefi bir ruh halindesiniz.\n\n❤️ Aşk & İlişkiler\nOrtak hayaller ilişkinizi derinleştiriyor.\n\n💼 Kariyer & Para\nYeni öğrenme fırsatları kapıda.\n\n🌿 Sağlık & Enerji\nKüçük bir kaçamak size iyi gelecek.\n\n🔮 Günün Mesajı\nHer yolculuk, içinde başlar.`,
  ],
  "Oğlak": [
    `🌟 Genel Enerji\nSatürn'ün disipliniyle bugün kararlılığınız dorukta.\n\n❤️ Aşk & İlişkiler\nGüvenilirliğiniz sevdikleriniz için en değerli hediye.\n\n💼 Kariyer & Para\nUzun vadeli vizyonunuz bugün size avantaj sağlıyor.\n\n🌿 Sağlık & Enerji\nDüzenli uyku bugün sizi besliyor.\n\n🔮 Günün Mesajı\nDağın zirvesi, her adımı sayan ayaklara aittir.`,
    `🌟 Genel Enerji\nBugün hedeflerinize olan bağlılığınız ilham verici.\n\n❤️ Aşk & İlişkiler\nKalıcı ilişkiler inşa etme yeteneğiniz bugün parlıyor.\n\n💼 Kariyer & Para\nEmeklerinizin karşılığı alınıyor.\n\n🌿 Sağlık & Enerji\nKendinize karşı nazik olun.\n\n🔮 Günün Mesajı\nYavaş ilerlemek, durmuş olmak değildir.`,
  ],
  "Kova": [
    `🌟 Genel Enerji\nÜranüs'ün yenilikçi enerjisiyle alışılmışın dışında düşünüyorsunuz.\n\n❤️ Aşk & İlişkiler\nOrijinal jestler ilişkinize heyecan katıyor.\n\n💼 Kariyer & Para\nYenilikçi fikirleriniz büyük yankı uyandırıyor.\n\n🌿 Sağlık & Enerji\nTopluluk aktiviteleri size enerji veriyor.\n\n🔮 Günün Mesajı\nGelecek, onu hayal edenler tarafından inşa edilir.`,
    `🌟 Genel Enerji\nBugün insanlığa hizmet etme arzunuz güçleniyor.\n\n❤️ Aşk & İlişkiler\nFikir alışverişi ilişkinizi besliyor.\n\n💼 Kariyer & Para\nTeknoloji odaklı projeler bugün şanslı.\n\n🌿 Sağlık & Enerji\nAlışılmadık bir aktivite deneyin.\n\n🔮 Günün Mesajı\nFarklı olmak, öncü olmaktır.`,
  ],
  "Balık": [
    `🌟 Genel Enerji\nNeptün'ün mistik enerjisiyle sezgileriniz zirveye çıkıyor.\n\n❤️ Aşk & İlişkiler\nRomantik ve idealist bir enerji var; aşkı kucaklayın.\n\n💼 Kariyer & Para\nSanatsal projeler bugün ilham veriyor.\n\n🌿 Sağlık & Enerji\nMeditasyon ruhunuzu besleyecek.\n\n🔮 Günün Mesajı\nHayaller; gerçeğin henüz tamamlanmamış taslağıdır.`,
    `🌟 Genel Enerji\nBugün sezgisel bilginiz çok güçlü.\n\n❤️ Aşk & İlişkiler\nDerin empati yeteneğiniz ilişkinizi benzersiz kılıyor.\n\n💼 Kariyer & Para\nYardım mesleklerinde bugün başarı sizi bekliyor.\n\n🌿 Sağlık & Enerji\nSuya yakın olmak sizi yenileyecek.\n\n🔮 Günün Mesajı\nEn güçlü akıntı, sessizce akan sudur.`,
  ],
};

const WEEKLY = {
  "Koç": `Pazartesi: Yeni haftaya güçlü bir enerjiyle başlıyorsunuz.\nSalı: İş konularında önemli gelişmeler kapıda.\nÇarşamba: Sosyal bağlantılar size fırsatlar sunuyor.\nPerşembe: Mali konularda dikkatli kararlar alın.\nCuma: Romantik enerji yükseliyor.\nCumartesi: Dinlenme ve yeniden şarj olma günü.\nPazar: Önümüzdeki hafta için plan yapın.\n\nHaftalık Özet: Bu hafta Koç burcu için harekete geçme ve sonuç alma enerjisi hakim. Mars'ın etkisiyle girişimleriniz güçlü bir ivme kazanıyor. İlişkilerinizde açık iletişim kurun. Finansal konularda aceleci davranmaktan kaçının.`,
  "Boğa": `Pazartesi: Haftaya sakin ve kararlı bir başlangıç yapıyorsunuz.\nSalı: Maddi konularda olumlu gelişmeler bekleniyor.\nÇarşamba: Sevdiklerinizle kaliteli zaman geçirin.\nPerşembe: İş hayatında emekleriniz karşılık buluyor.\nCuma: Venüs'ün etkisiyle romantizm ön planda.\nCumartesi: Doğayla buluşun, ruhunuzu besleyin.\nPazar: Gelecek planları yapmak için ideal.\n\nHaftalık Özet: Boğa için bu hafta sabır ve kararlılığın ödüllendirildiği bir dönem. Venüs'ün etkisiyle hem aşk hem de estetik konularda güzel gelişmeler yaşanabilir.`,
  "İkizler": `Pazartesi: Zihinsel enerji zirveye çıkıyor.\nSalı: İletişim konularında başarılı bir gün.\nÇarşamba: Sosyal çevreniz genişliyor.\nPerşembe: Öğrenme için mükemmel bir gün.\nCuma: Eğlenceli planlar günde enerji katıyor.\nCumartesi: Yaratıcı aktiviteler için ideal.\nPazar: Dinlenerek zihin gücünüzü yenileyin.\n\nHaftalık Özet: İkizler için bu hafta iletişim ve öğrenmenin ön planda olduğu hareketli bir dönem. Merkür'ün etkisiyle yeni bilgiler edinmek kolay.`,
  "Yengeç": `Pazartesi: Duygusal sezgileriniz bugün rehberiniz.\nSalı: Aile konularında güzel gelişmeler.\nÇarşamba: İş hayatında yaratıcılığınızı kullanın.\nPerşembe: Sezgilerinize güvenerek kararlar alın.\nCuma: Sevdiklerinizle sıcak anlar yaşıyorsunuz.\nCumartesi: Kendinize şefkat gösterin.\nPazar: Ruhsal yenilenme için sessizlik zamanı.\n\nHaftalık Özet: Yengeç için bu hafta duygusal derinlik ve aile bağlarının güçlendiği bir dönem.`,
  "Aslan": `Pazartesi: Haftaya karizmatik bir girişle başlıyorsunuz.\nSalı: Yaratıcı projeler ilerleme kaydediyor.\nÇarşamba: Liderlik yetenekleriniz öne çıkıyor.\nPerşembe: Sosyal hayatınız renkleniyor.\nCuma: Romantik sürprizler günü aydınlatıyor.\nCumartesi: Sevdiklerinizle eğlenceli vakit geçirin.\nPazar: Dinlenerek gelen haftaya hazırlanın.\n\nHaftalık Özet: Aslan için bu hafta parlamanın ve takdir görmenin zamanı.`,
  "Başak": `Pazartesi: Organize bir başlangıçla verimli hafta açılıyor.\nSalı: Detaylara verdiğiniz önem takdir görüyor.\nÇarşamba: Sağlık ve rutinler üzerine odaklanın.\nPerşembe: İş projeleri somut ilerleme kaydediyor.\nCuma: Mükemmeliyetçiliği bir kenara bırakıp eğlenin.\nCumartesi: Kendinize iyi bakın.\nPazar: Gelecek haftanın planlarını yapın.\n\nHaftalık Özet: Başak için bu hafta verimlilik ve düzenin ön planda olduğu bir dönem.`,
  "Terazi": `Pazartesi: Denge ve uyum arayışıyla başlıyorsunuz.\nSalı: İlişkilerde güzel gelişmeler yaşanıyor.\nÇarşamba: Sanatsal aktiviteler ilham veriyor.\nPerşembe: Önemli kararlar için doğru zaman.\nCuma: Sosyal hayatınız canlılık kazanıyor.\nCumartesi: Kendinize yatırım yapın.\nPazar: İç dengenizi yenileyin.\n\nHaftalık Özet: Terazi için bu hafta ilişkiler ve denge konularının öne çıktığı güzel bir dönem.`,
  "Akrep": `Pazartesi: Derin sezgileriniz bu hafta güçlü.\nSalı: Gizli konular gün yüzüne çıkıyor.\nÇarşamba: Dönüşüm için güçlü bir gün.\nPerşembe: Finansal konularda stratejik adımlar atın.\nCuma: Duygusal bağlarınız güçleniyor.\nCumartesi: Kendinizi yenileme zamanı.\nPazar: Derin iç görüşler için meditasyon yapın.\n\nHaftalık Özet: Akrep için bu hafta derinlik ve dönüşümün zamanı.`,
  "Yay": `Pazartesi: Haftaya iyimser bir enerjiyle başlıyorsunuz.\nSalı: Yeni öğrenme fırsatları kapıda.\nÇarşamba: Uzak mesafeli bağlantılar güzel haberler getiriyor.\nPerşembe: Felsefi düşünceler günü renklendiriyor.\nCuma: Macera ve keşif enerjisi yoğunlaşıyor.\nCumartesi: Seyahat için ideal.\nPazar: Özgür ruhunuzu besleyin.\n\nHaftalık Özet: Yay için bu hafta genişleme ve keşfin zamanı.`,
  "Oğlak": `Pazartesi: Kararlı adımlarla haftaya başlıyorsunuz.\nSalı: Uzun vadeli hedefleriniz netlik kazanıyor.\nÇarşamba: İş hayatında önemli ilerleme.\nPerşembe: Mali konularda akıllıca adımlar atın.\nCuma: Keyif de önemli, çalışmanın yanı sıra eğlenin.\nCumartesi: Sevdiklerinizle zaman geçirin.\nPazar: Bir sonraki haftanın stratejisini oluşturun.\n\nHaftalık Özet: Oğlak için bu hafta çalışkanlık ve kararlılığın meyve verdiği bir dönem.`,
  "Kova": `Pazartesi: Yenilikçi fikirler haftaya renk katıyor.\nSalı: Toplumsal konular ön planda.\nÇarşamba: Teknoloji alanında fırsatlar.\nPerşembe: Arkadaşlık bağları güçleniyor.\nCuma: Orijinal projeler ilgi görüyor.\nCumartesi: Toplulukla vakit size enerji veriyor.\nPazar: Gelecek hayalleriniz üzerine düşünün.\n\nHaftalık Özet: Kova için bu hafta yenilik ve toplumsal bağların ön planda olduğu ilham verici bir dönem.`,
  "Balık": `Pazartesi: Sezgisel bilginiz haftaya yön veriyor.\nSalı: Yaratıcı projeler gelişiyor.\nÇarşamba: Ruhsal derinlik günü.\nPerşembe: Yardım etme enerjisi güçlü.\nCuma: Romantik bağlar derinleşiyor.\nCumartesi: Sanatsal ifade için ideal.\nPazar: Ruhunuzu sessizlikle besleyin.\n\nHaftalık Özet: Balık için bu hafta sezgi ve yaratıcılığın zirveye çıktığı mistik bir dönem.`,
};

const DREAM_KEYWORDS = {
  su: { symbols: ["su", "deniz", "göl", "yağmur", "nehir", "dalga", "sel"], meaning: "Su, duygusal durumunuzu ve bilinçaltınızı temsil eder. Bu rüya, bastırılmış duyguların yüzeye çıkmak istediğine işaret edebilir. Burcunuzun etkisiyle bu duygusal dalgalanma yakında bir netliğe kavuşacak." },
  uçma: { symbols: ["uçmak", "uçuş", "uçuyordum", "havalanmak", "kanatlar"], meaning: "Uçma rüyaları özgürlük arzusunu ve sınırları aşma isteğini simgeler. Hayatınızda kendinizi kısıtlayan durumlardan kurtulmak istiyorsunuz. Burcunuzun enerjisi size bu özgürlüğü yakında getirecek." },
  düşme: { symbols: ["düşmek", "düşüyordum", "uçurum", "yüksekten"], meaning: "Düşme rüyaları kontrol kaybı korkusunu veya belirsizlik hissini yansıtır. Ancak endişelenmeyin; bu rüya değişime hazırlanmanızı söylüyor. Burcunuzun gücüyle yeniden ayağa kalkacaksınız." },
  hayvan: { symbols: ["köpek", "kedi", "at", "kuş", "yılan", "aslan", "kurt"], meaning: "Hayvan rüyaları içgüdüsel dürtüleri ve doğal enerjinizi temsil eder. Gördüğünüz hayvan, şu an hayatınıza getirmeniz gereken bir enerjiyi simgeliyor. Burcunuzla birleşince bu güç katlanıyor." },
  ev: { symbols: ["ev", "oda", "kapı", "pencere", "salon", "mutfak", "yatak"], meaning: "Ev rüyaları iç dünyanızı ve benliğinizi temsil eder. Her oda farklı bir yönünüzü simgeler. Bu rüya kendinizi daha iyi tanıma zamanının geldiğini müjdeliyor." },
  ölüm: { symbols: ["ölmek", "öldüm", "cenaze", "mezar", "ölüm"], meaning: "Ölüm rüyaları korkutsa da aslında yeniden doğuşu ve dönüşümü simgeler. Hayatınızda bir şeyin sona erip yeni bir dönemin başlayacağının habercisi. Burcunuzun enerjisiyle bu geçiş güçlü olacak." },
  default: { meaning: "Bu rüya, bilinçaltınızın size gönderdiği önemli bir mesaj taşıyor. Rüyanızdaki semboller, şu an yaşadığınız dönemi ve iç dünyanızı yansıtıyor. Burcunuzun rehberliğinde bu mesajı doğru yorumlamak ve hayatınıza uygulamak size güç katacak." },
};

const DREAM_SIGN_SUFFIX = {
  "Koç": "Mars enerjiniz bu rüyayı harekete geçirdi. Cesur adımlar atmak için hazırsınız.",
  "Boğa": "Venüs'ün etkisiyle bu rüya size güzellik ve huzur arayışınızı gösteriyor.",
  "İkizler": "Zihinsel aktiviteniz bu rüyayı şekillendirdi. Merakınızı takip edin.",
  "Yengeç": "Ay'ın çocuğu olarak duygusal mesajları en güçlü alan sizsiniz.",
  "Aslan": "Güneş enerjiniz bu rüyayı altın bir ışıkla aydınlatıyor. Parlamaya hazır olun.",
  "Başak": "Analitik zihniniz bu rüyada bile detayları işliyor. İşaretlere dikkat edin.",
  "Terazi": "Venüs'ün zarafeti bu rüyaya denge ve uyum mesajı katmış.",
  "Akrep": "Plüton'un derinliğiyle bu rüya çok katmanlı; yüzeyin altına bakın.",
  "Yay": "Jüpiter'in bolluğu bu rüyayı umut dolu bir mesajla donattı.",
  "Oğlak": "Satürn'ün bilgeliği bu rüyada size uzun vadeli bir mesaj gönderiyor.",
  "Kova": "Üranüs'ün yenilikçi enerjisi bu rüyayı sıradışı kıldı. Farklı düşünün.",
  "Balık": "Neptün'ün mistik alanında yaşıyorsunuz; rüyalarınız gerçek kehanetler taşıyabilir.",
};

const COMPAT_TEXT = {
  "95": "Bu iki burç arasındaki uyum yıldızlar tarafından özel olarak yazılmış gibi. Birbirinizi tamamlıyorsunuz; güçlü yönleriniz birleşince olağanüstü bir enerji ortaya çıkıyor.",
  "70": "Aranızdaki bağ güçlü ve kalıcı olmaya elverişli. Birbirinizi anlamak için çaba gösterdiğinizde ortaya çıkan uyum sizi şaşırtacak.",
  "60": "Her ilişki gibi bu da özveri ve anlayış gerektiriyor. Sabır ve iletişim ile bu ilişkiyi güçlendirebilirsiniz.",
  "40": "Bu kombinasyon zorlu olabilir, ama imkânsız değil. Güçlü bir bağ kurmak istiyorsanız karşılıklı saygı ve sabır şart.",
};

const SAME_SIGN_COMPAT = {
  "Koç":     { score: 65, label: "Ateşli Rekabet", emoji: "⚡", color: "#C9A84C", text: "İki Koç bir arada çok enerji ve heyecan yaratır, ama ikisi de lider olmak istediği için çatışmalar kaçınılmaz. Saygı ve uzlaşı olursa bu ilişki güçlü olabilir." },
  "Boğa":    { score: 78, label: "Güçlü Uyum", emoji: "💚", color: "#2D8B6E", text: "İki Boğa arasındaki uyum oldukça güçlü. Aynı değerlere ve aynı konfor anlayışına sahipsiniz. Tek risk: İkiniz de inatçısınız." },
  "İkizler": { score: 58, label: "Eğlenceli Kaos", emoji: "🌀", color: "#7B2D8B", text: "İki İkizler bir araya gelince eğlence eksik olmaz ama istikrar zor. Derinleşmek için çaba gerekir." },
  "Yengeç":  { score: 72, label: "Derin Bağ", emoji: "💙", color: "#2D5F8B", text: "İki Yengeç birbirini derinden anlayabilir. Ancak iki hassas ruh bir arada olunca duygusal yoğunluk bazen boğucu olabilir." },
  "Aslan":   { score: 52, label: "Dikkat Gerekli", emoji: "👑", color: "#8B5E2D", text: "İki Aslan aynı sahnede parlamak ister. Ego bir kenara bırakılırsa muhteşem bir güç çifti olunabilir." },
  "Başak":   { score: 80, label: "Mükemmel Düzen", emoji: "✨", color: "#C9956C", text: "İki Başak birlikte son derece uyumlu ve verimli olabilir. Tek risk: İkisi de eleştirici olduğu için küçük şeyler büyüyebilir." },
  "Terazi":  { score: 70, label: "Zarif Uyum", emoji: "⚖️", color: "#C9A84C", text: "İki Terazi birlikte güzel ve uyumlu bir ilişki kurabilir. Ancak ikisi de karar vermekte zorlandığı için biri öne çıkmalı." },
  "Akrep":   { score: 48, label: "Yoğun Gerilim", emoji: "🔥", color: "#8B2D2D", text: "İki Akrep bir araya gelince yoğunluk tavan yapar. Güven şarttır, yoksa ciddi çatışmalar yaşanabilir." },
  "Yay":     { score: 63, label: "Özgür Ruhlar", emoji: "🏹", color: "#7B2D8B", text: "İki Yay birlikte harika maceralar yaşar ve birbirini kısıtlamaz. Bağlılığı derinleştirmek zaman alabilir." },
  "Oğlak":   { score: 75, label: "Güçlü Temel", emoji: "🏔️", color: "#2D8B6E", text: "İki Oğlak aynı hedeflere sahip. Bu ilişki sağlam temeller üzerine kurulur. His paylaşımına önem verin." },
  "Kova":    { score: 66, label: "Zihin Ortaklığı", emoji: "🌊", color: "#2D5F8B", text: "İki Kova entelektüel uyum konusunda mükemmel. Derin yakınlık için ekstra çaba gerekebilir." },
  "Balık":   { score: 60, label: "Rüya Dünyası", emoji: "🔮", color: "#7B2D8B", text: "İki Balık çok romantik bir bağ kurabilir. Pratik yaşam konularında birbirinizi dengeleyin." },
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

const YESNO_ANSWERS = [
  { answer: "EVET", isYes: true, text: "Evrenin işaretleri olumlu. Yıldızlar bu yolda sizi destekliyor; cesaretinizi toplayın ve adımı atın." },
  { answer: "EVET", isYes: true, text: "Bu sorunun cevabı evet, ancak zamanlamanıza dikkat edin. Doğru an çok önemli." },
  { answer: "HAYIR", isYes: false, text: "Şu an için evren hayır diyor. Bu bir kapının kapanması değil, daha iyi bir şeyin hazırlanması." },
  { answer: "HAYIR", isYes: false, text: "Yıldızlar bu konuda temkinli olmanızı söylüyor. Geri çekilip durumu yeniden değerlendirin." },
  { answer: "EVET", isYes: true, text: "Kalbiniz zaten cevabı biliyor. Evet, devam edin. Bu adım sizi daha güçlü kılacak." },
  { answer: "HAYIR", isYes: false, text: "Evren şu an farklı bir yönü işaret ediyor. Daha uygun bir yola yönlendirmek için geldi bu cevap." },
];

const RISING_COMBOS = {
  default: (birth, rising) => `⭐ Doğum Burcu × Yükselen Etkisi\n${birth} güneş enerjisi ile ${rising} yükselen enerjisi birleşince hem güçlü bir öz hem de çevreye yansıttığınız farklı bir kişilik ortaya çıkıyor.\n\n🌅 Dış Dünyaya Yansıman\nİnsanlar sizi ilk gördüklerinde ${rising} burcunun özelliklerini hisseder. Ancak sizi tanıdıkça asıl doğanız olan ${birth} enerjisi ortaya çıkar.\n\n💫 Güçlü Yanların\nBu kombinasyon hem içsel derinlik hem de sosyal uyum yeteneği kazandırıyor. İnsanları anlama ve uyum sağlama konusunda güçlüsünüz.\n\n🌑 Dikkat Etmen Gerekenler\nDışarıya yansıttığın ile içinde hissettiklerin arasındaki uçurum zaman zaman yorucu olabilir. Otantik olmaya çalış.\n\n🔮 Senin İçin Mesaj\nİki burcun gücünü taşıyorsun; bu bir yük değil, nadir bir armağan.`,
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

function interpretDream(text, sign) {
  const lowerText = text.toLowerCase();
  for (const [, data] of Object.entries(DREAM_KEYWORDS)) {
    if (data.symbols && data.symbols.some(s => lowerText.includes(s))) {
      return data.meaning + "\n\n✨ " + (DREAM_SIGN_SUFFIX[sign.name] || "");
    }
  }
  return DREAM_KEYWORDS.default.meaning + "\n\n✨ " + (DREAM_SIGN_SUFFIX[sign.name] || "");
}

function calcGroupScore(signs) {
  let total = 0;
  let count = 0;
  for (let i = 0; i < signs.length; i++) {
    for (let j = i + 1; j < signs.length; j++) {
      const r = getCompatibilityScore(signs[i], signs[j]);
      total += r ? r.score : 60;
      count++;
    }
  }
  return count > 0 ? Math.round(total / count) : 0;
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
  const [risingSign, setRisingSign] = useState(null);
  const [risingReading, setRisingReading] = useState("");

  const [dreamText, setDreamText] = useState("");
  const [dreamSign, setDreamSign] = useState(null);
  const [dreamResult, setDreamResult] = useState(null);

  const [groupSigns, setGroupSigns] = useState([]);
  const [groupResult, setGroupResult] = useState(null);

  const [cardSign, setCardSign] = useState(null);

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

  async function getHoroscope(sign) {
    setSelectedSign(sign);
    setView("result");
    setActiveResultTab("daily");
    setLuckData(generateLuck());
    setDailyIndex(0);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Sen mistik ve bilge bir astroloji uzmanısın. Bugün ${today} için ${sign.name} burcu günlük yorumu yaz. Şu bölümleri içersin:

🌟 Genel Enerji (2-3 cümle)
❤️ Aşk & İlişkiler (2 cümle)
💼 Kariyer & Para (2 cümle)
🌿 Sağlık & Enerji (1-2 cümle)
🔮 Günün Mesajı (1 güçlü cümle)

Mistik, içten ve ilham verici bir dil kullan. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("\n") || DAILY[sign.name]?.[0] || "Yorum alınamadı.";
      DAILY[sign.name] = [text, ...(DAILY[sign.name] || [])];
      setDailyIndex(0);
    } catch {
      setDailyIndex(0);
    }
  }

  function openSign(sign) {
    getHoroscope(sign);
  }

  async function getWeeklyHoroscope() {
    if (!selectedSign) return;
    setActiveResultTab("weekly");
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `${selectedSign.name} burcu için bu haftanın Türkçe astroloji yorumunu yaz. Pazartesi'den Pazar'a her gün için kısa bir enerji notu (1 cümle) yaz, sonra haftalık genel özet yaz (3-4 cümle). Mistik bir dil kullan. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("\n") || WEEKLY[selectedSign.name] || "Yorum alınamadı.";
      WEEKLY[selectedSign.name] = text;
    } catch {
      // Hata olursa statik yorum gösterilir
    }
  }

  function calcRisingSign(birthSign, hour) {
    const signIndex = SIGNS.findIndex(s => s.name === birthSign.name);
    const offset = Math.floor(parseInt(hour) / 2);
    return SIGNS[(signIndex + offset) % 12];
  }

  async function getRisingReading() {
    if (!risingBirthSign || birthHour === "") return;
    const rising = calcRisingSign(risingBirthSign, birthHour);
    setRisingSign(rising);
    
    const staticResult = RISING_COMBOS.default(risingBirthSign.name, rising.name);
    setRisingReading("Hesaplanıyor...");
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{
            role: "user",
            content: `${risingBirthSign.name} doğum burcu ve ${rising.name} yükselen burcu kombinasyonunu Türkçe yorumla. 

Şu başlıklar altında yaz:
⭐ Doğum × Yükselen Etkisi (2 cümle)
🌅 Dış Dünyaya Yansıman (2 cümle)
💫 Güçlü Yanların (2 cümle)
🌑 Dikkat Etmen Gerekenler (1-2 cümle)
🔮 Senin İçin Mesaj (1 güçlü cümle)

Mistik ve içten bir dil kullan. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("\n") || staticResult;
      setRisingReading(text);
    } catch {
      setRisingReading(staticResult);
    }
  }

  async function askYesNo() {
    if (!yesNoQ.trim()) return;
    const r = YESNO_ANSWERS[Math.floor(Math.random() * YESNO_ANSWERS.length)];
    setYesNoResult(r);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          messages: [{
            role: "user",
            content: `Bu soruya "EVET" ya da "HAYIR" ile cevap ver ve 2-3 cümleyle mistik bir açıklama yap: "${yesNoQ}"

Sadece EVET veya HAYIR yaz, sonra açıklama ekle. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("\n");
      if (text) {
        const isYes = text.toUpperCase().includes("EVET");
        const cleanText = text.replace(/^(EVET|HAYIR)\s*:?\s*/i, "").trim();
        setYesNoResult({ answer: isYes ? "EVET" : "HAYIR", isYes, text: cleanText });
      }
    } catch {
      // Hata olursa statik cevap gösterilir
    }
  }

  async function checkCompatibility() {
    if (!sign1 || !sign2) return;
    const result = getCompatibilityScore(sign1, sign2);
    setCompat(result);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          messages: [{
            role: "user",
            content: `${sign1.name} ve ${sign2.name} burcları arasındaki ${sign1.name === sign2.name ? "aynı burç ilişki" : "ilişki"} uyumunu Türkçe anlat. 3-4 cümle, mistik ve samimi bir dil kullan. Güçlü yönleri ve dikkat edilmesi gerekenleri belirt. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("\n");
      if (text) {
        setCompat(prev => ({ ...prev, sameText: text, customText: text }));
      }
    } catch {
      // Hata olursa statik yorum gösterilir
    }
  }

  async function interpretDreamLocal() {
    if (!dreamText.trim() || !dreamSign) return;
    
    const staticResult = interpretDream(dreamText, dreamSign);
    setDreamResult("Yorumlanıyor...");
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{
            role: "user",
            content: `${dreamSign.name} burcu için bu rüyayı mistik bir dille yorumla: "${dreamText}"

Rüyadaki sembolleri analiz et ve ${dreamSign.name} burcunun enerjisiyle birleştirerek yorum yap. İçten, bilge ve ilham verici bir ton kullan. 4-5 cümle yaz. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("\n") || staticResult;
      setDreamResult(text);
    } catch {
      setDreamResult(staticResult);
    }
  }

  function toggleGroupSign(sign) {
    setGroupResult(null);
    setGroupSigns(prev => {
      if (prev.find(s => s.name === sign.name)) return prev.filter(s => s.name !== sign.name);
      if (prev.length >= 6) return prev;
      return [...prev, sign];
    });
  }

  function calcGroup() {
    if (groupSigns.length < 2) return;
    const score = calcGroupScore(groupSigns);
    let label, emoji, color;
    if (score >= 80) { label = "Mükemmel Ekip"; emoji = "🌟"; color = "#C9956C"; }
    else if (score >= 65) { label = "Uyumlu Grup"; emoji = "💛"; color = "#C9A84C"; }
    else if (score >= 50) { label = "Dengeli Takım"; emoji = "🤝"; color = "#7B2D8B"; }
    else { label = "Zorlu Dinamik"; emoji = "⚡"; color = "#8B2D2D"; }
    setGroupResult({ score, label, emoji, color });
  }

  const tabs = [
    { id: "home", icon: "✦", label: "Burçlar" },
    { id: "compat", icon: "♾", label: "Uyum" },
    { id: "extras", icon: "✨", label: "Keşfet" },
    { id: "yesno", icon: "🔮", label: "Fal" },
    { id: "rising", icon: "🌅", label: "Yükselen" },
  ];

  const btnStyle = (active) => ({
    width: "100%", padding: "14px", borderRadius: 14, cursor: "pointer",
    background: active ? `linear-gradient(135deg, ${th.purple}, #C9956C)` : th.card,
    border: `1px solid ${active ? "transparent" : th.border}`,
    color: active ? "white" : th.sub,
    fontSize: 15, fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: "all 0.3s",
  });

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
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .sign-pill:hover { transform: translateY(-2px) scale(1.04); }
        textarea:focus, input:focus { outline: none; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        textarea::placeholder, input::placeholder { color: ${th.placeholder}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,149,108,0.3); border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: th.bg, color: th.text, fontFamily: "'Jost', sans-serif", position: "relative", transition: "background 0.4s" }}>
        <Stars dark={dark} />
        <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", position: "relative", zIndex: 1, paddingBottom: 90 }}>

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
                      <button key={t.id} onClick={() => { setActiveResultTab(t.id); if (t.id === "weekly") getWeeklyHoroscope(); }} style={{
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
                      <button onClick={() => { 
                        setLuckData(generateLuck()); 
                        if (activeResultTab === "daily") {
                          getHoroscope(selectedSign);
                        } else {
                          getWeeklyHoroscope();
                        }
                      }} style={{
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
                    else { setSign1(s); setSign2(null); setCompat(null); }
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
                <button onClick={checkCompatibility} style={btnStyle(true)}>✦ Uyumu Hesapla</button>
              )}

              {compat && (
                <div style={{ animation: "scaleIn 0.4s ease", marginTop: 20 }}>
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
                    {compat.customText || (compat.key === "same" ? compat.sameText : (COMPAT_TEXT[String(compat.score)] || COMPAT_TEXT["60"]))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* KEŞFet - Yeni özellikler */}
          {tab === "extras" && (
            <div style={{ padding: "24px 16px 0", animation: "fadeUp 0.5s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>✨</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: th.accent }}>Keşfet</h2>
              </div>

              {/* Alt sekmeler */}
              <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                {[
                  { id: "dream", label: "🌙 Rüya" },
                  { id: "group", label: "👥 Grup" },
                  { id: "card", label: "🎴 Kart" },
                ].map(t => (
                  <button key={t.id} onClick={() => {
                    if (tab === "extras") {
                      document.querySelectorAll("[data-extra-tab]").forEach(el => el.style.display = "none");
                      document.querySelector(`[data-extra-tab="${t.id}"]`).style.display = "block";
                    }
                  }} style={{
                    flex: 1, padding: "10px 4px", borderRadius: 12, cursor: "pointer",
                    border: `1px solid ${th.border}`, background: th.card,
                    color: th.text, fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 500,
                  }}>{t.label}</button>
                ))}
              </div>

              {/* RÜYA YORUMU */}
              <div>
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 32, marginBottom: 6 }}>🌙</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: th.accent }}>Rüya Yorumu</h3>
                  <p style={{ fontSize: 12, color: th.sub, marginTop: 4, fontStyle: "italic" }}>Rüyanı anlat, burcunla yorumlayalım</p>
                </div>

                <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>1. Burcunu Seç</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 16 }}>
                  {SIGNS.map(s => (
                    <button key={s.name} onClick={() => { setDreamSign(s); setDreamResult(null); }} style={{
                      background: dreamSign === s ? `rgba(201,149,108,0.2)` : th.card,
                      border: `1px solid ${dreamSign === s ? th.accent : th.border}`,
                      borderRadius: 10, padding: "8px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                    }}>
                      <div style={{ fontSize: 16 }}>{s.symbol}</div>
                      <div style={{ fontSize: 8, color: dreamSign === s ? th.accent : th.sub, marginTop: 2, textTransform: "uppercase" }}>{s.name}</div>
                    </button>
                  ))}
                </div>

                <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>2. Rüyanı Anlat</p>
                <textarea
                  value={dreamText}
                  onChange={e => { setDreamText(e.target.value); setDreamResult(null); }}
                  placeholder="Rüyanı kısaca anlat... (örn: Denizde yüzüyordum, uçmaya çalışıyordum...)"
                  style={{ width: "100%", minHeight: 90, padding: "14px", background: th.inputBg, border: `1px solid ${th.border}`, borderRadius: 14, color: th.text, fontSize: 13, lineHeight: 1.7, fontFamily: "'Jost', sans-serif", resize: "none", marginBottom: 12 }}
                />
                <button onClick={interpretDreamLocal} disabled={!dreamText.trim() || !dreamSign} style={btnStyle(dreamText.trim() && dreamSign)}>
                  🌙 Rüyamı Yorumla
                </button>

                {dreamResult && (
                  <div style={{ marginTop: 16, animation: "scaleIn 0.4s ease", background: th.card, border: `1px solid ${th.border}`, borderRadius: 20, padding: "22px 18px" }}>
                    <div style={{ textAlign: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 32 }}>🌙</span>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", color: th.accent, marginTop: 6 }}>Rüya Yorumun</h4>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.9, color: th.text, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{dreamResult}</p>
                  </div>
                )}

                {/* GRUP UYUMU */}
                <div style={{ marginTop: 36, paddingTop: 28, borderTop: `1px solid ${th.border}` }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 32, marginBottom: 6 }}>👥</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: th.accent }}>Arkadaş Grubu Uyumu</h3>
                    <p style={{ fontSize: 12, color: th.sub, marginTop: 4, fontStyle: "italic" }}>2-6 kişi seç, grubunuzun enerjisini gör</p>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, minHeight: 44, padding: "8px", background: th.card, borderRadius: 14, border: `1px solid ${th.border}` }}>
                    {groupSigns.length === 0
                      ? <p style={{ fontSize: 12, color: th.sub, margin: "auto" }}>Aşağıdan burç seç ↓</p>
                      : groupSigns.map(s => (
                        <span key={s.name} onClick={() => toggleGroupSign(s)} style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          background: `rgba(201,149,108,0.2)`, border: `1px solid ${th.accent}`,
                          borderRadius: 20, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: th.accent,
                        }}>{s.symbol} {s.name} ✕</span>
                      ))
                    }
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 16 }}>
                    {SIGNS.map(s => (
                      <button key={s.name} onClick={() => toggleGroupSign(s)} style={{
                        background: groupSigns.find(g => g.name === s.name) ? `rgba(201,149,108,0.2)` : th.card,
                        border: `1px solid ${groupSigns.find(g => g.name === s.name) ? th.accent : th.border}`,
                        borderRadius: 10, padding: "8px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                      }}>
                        <div style={{ fontSize: 16 }}>{s.symbol}</div>
                        <div style={{ fontSize: 8, color: groupSigns.find(g => g.name === s.name) ? th.accent : th.sub, marginTop: 2, textTransform: "uppercase" }}>{s.name}</div>
                      </button>
                    ))}
                  </div>

                  <button onClick={calcGroup} disabled={groupSigns.length < 2} style={btnStyle(groupSigns.length >= 2)}>
                    👥 Grup Uyumunu Hesapla
                  </button>

                  {groupResult && (
                    <div style={{ marginTop: 16, animation: "scaleIn 0.4s ease", background: th.card, border: `1px solid ${groupResult.color}`, borderRadius: 20, padding: "24px", textAlign: "center" }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>{groupResult.emoji}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: groupResult.color, marginBottom: 8 }}>{groupResult.label}</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} style={{ width: 22, height: 6, borderRadius: 3, background: i < Math.round(groupResult.score / 10) ? groupResult.color : `rgba(201,149,108,0.15)` }} />
                        ))}
                      </div>
                      <div style={{ fontSize: 14, color: th.sub, marginBottom: 8 }}>Grup Uyumu: %{groupResult.score}</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
                        {groupSigns.map(s => (
                          <span key={s.name} style={{ fontSize: 22 }}>{s.symbol}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* BURÇ KARTI */}
                <div style={{ marginTop: 36, paddingTop: 28, borderTop: `1px solid ${th.border}` }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 32, marginBottom: 6 }}>🎴</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: th.accent }}>Burç Kartım</h3>
                    <p style={{ fontSize: 12, color: th.sub, marginTop: 4, fontStyle: "italic" }}>Burcunu seç, kişisel kartını oluştur</p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 16 }}>
                    {SIGNS.map(s => (
                      <button key={s.name} onClick={() => setCardSign(s)} style={{
                        background: cardSign === s ? `rgba(201,149,108,0.2)` : th.card,
                        border: `1px solid ${cardSign === s ? th.accent : th.border}`,
                        borderRadius: 10, padding: "8px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                      }}>
                        <div style={{ fontSize: 16 }}>{s.symbol}</div>
                        <div style={{ fontSize: 8, color: cardSign === s ? th.accent : th.sub, marginTop: 2, textTransform: "uppercase" }}>{s.name}</div>
                      </button>
                    ))}
                  </div>

                  {cardSign && (
                    <div style={{ animation: "scaleIn 0.4s ease" }}>
                      {/* Kart */}
                      <div style={{
                        background: `linear-gradient(135deg, #0D0918 0%, ${cardSign.color}33 50%, #1a0a2e 100%)`,
                        border: `2px solid ${cardSign.color}`,
                        borderRadius: 24, padding: "32px 24px", textAlign: "center",
                        position: "relative", overflow: "hidden", marginBottom: 12,
                      }}>
                        <div style={{ position: "absolute", top: 12, left: 16, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>KUBER BURÇLAR</div>
                        <div style={{ position: "absolute", top: 12, right: 16, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{today}</div>
                        <div style={{ fontSize: 72, margin: "20px 0 12px", filter: `drop-shadow(0 0 20px ${cardSign.color})` }}>{cardSign.symbol}</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#EDE0D4", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{cardSign.name}</h2>
                        <p style={{ fontSize: 12, color: "rgba(237,224,212,0.5)", letterSpacing: "0.1em", marginBottom: 16 }}>{cardSign.en.toUpperCase()}</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: "rgba(237,224,212,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Element</div>
                            <div style={{ fontSize: 13, color: "#C9956C", marginTop: 2 }}>{cardSign.element}</div>
                          </div>
                          <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: "rgba(237,224,212,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Taş</div>
                            <div style={{ fontSize: 13, color: "#C9956C", marginTop: 2 }}>{cardSign.stone}</div>
                          </div>
                          <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: "rgba(237,224,212,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Tarih</div>
                            <div style={{ fontSize: 11, color: "#C9956C", marginTop: 2 }}>{cardSign.dates}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(237,224,212,0.35)", fontStyle: "italic", letterSpacing: "0.05em" }}>✦ Yıldızların Rehberliğinde ✦</div>
                      </div>
                      <p style={{ textAlign: "center", fontSize: 12, color: th.sub, fontStyle: "italic" }}>📸 Ekran görüntüsü alarak paylaşabilirsiniz</p>
                    </div>
                  )}
                </div>
              </div>
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
              <button onClick={askYesNo} disabled={!yesNoQ.trim()} style={{ ...btnStyle(yesNoQ.trim()), marginTop: 12 }}>
                🔮 Cevabı Göster
              </button>

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

          {/* YÜKSELEN */}
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

              <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>2. Doğum Saati (0-23)</p>
              <input type="number" min="0" max="23" placeholder="örn: 14" value={birthHour}
                onChange={e => { setBirthHour(e.target.value); setRisingSign(null); setRisingReading(""); }}
                style={{ width: "100%", padding: "12px 14px", background: th.inputBg, border: `1px solid ${th.border}`, borderRadius: 12, color: th.text, fontSize: 16, fontFamily: "'Jost', sans-serif", textAlign: "center", marginBottom: 8 }} />
              <p style={{ fontSize: 11, color: th.sub, fontStyle: "italic", marginBottom: 20, textAlign: "center" }}>💡 Bilmiyorsan nüfus cüzdanına bakabilirsin</p>

              <button onClick={getRisingReading} disabled={!risingBirthSign || birthHour === ""} style={btnStyle(risingBirthSign && birthHour !== "")}>
                🌅 Yükseleni Hesapla
              </button>

              {risingSign && risingReading && (
                <div style={{ animation: "scaleIn 0.5s ease", marginTop: 20 }}>
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
                  <div style={{ background: th.card, border: `1px solid ${th.border}`, borderRadius: 20, padding: "22px 18px", fontSize: 15, lineHeight: 1.9, color: th.text, whiteSpace: "pre-wrap" }}>{risingReading}</div>
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
                <span style={{ fontSize: 18, color: tab === t.id ? th.accent : th.text }}>{t.icon}</span>
                <span style={{ fontSize: 9, color: tab === t.id ? th.accent : th.sub, letterSpacing: "0.06em", fontWeight: 500 }}>{t.label}</span>
                {tab === t.id && <div style={{ width: 16, height: 2, background: th.accent, borderRadius: 1 }} />}
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
