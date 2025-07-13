// discord-profile-api/api/index.js
const express = require('express');
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const cors = require('cors');

const app = express();
// Güvenlik için kendi sitenizin URL'sini buraya ekleyebilirsiniz:
// app.use(cors({ origin: 'https://sizin-siteniz.com' }));
app.use(cors()); // Şimdilik * tüm origin'lere izin veriyoruz
app.use(express.json());

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences // Kullanıcı durumları için gerekli olabilir
    ]
});

// Tokenı ortam değişkeninden alıyoruz, doğrudan kodda yazmıyoruz!
const BOT_TOKEN = process.env.DISCORD_API_BOT_TOKEN; 

if (!BOT_TOKEN) {
    console.error('Hata: DISCORD_API_BOT_TOKEN ortam değişkeni tanımlı değil! Bot giriş yapamayacak.');
} else {
    client.once('ready', () => {
        console.log(`API botu ${client.user.tag} olarak giriş yaptı!`);
    });
    client.login(BOT_TOKEN)
        .catch(err => console.error("API botu giriş hatası:", err));
}

app.get('/api/user/:userId/:guildId', async (req, res) => {
    if (!client.isReady()) {
        return res.status(503).json({ error: 'Bot henüz hazır değil, lütfen tekrar deneyin.' });
    }

    try {
        const { userId, guildId } = req.params;
        const user = await client.users.fetch(userId).catch(() => null); 

        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }

        const guild = client.guilds.cache.get(guildId); 

        if (!guild) {
            return res.status(404).json({ error: 'Sunucu bulunamadı veya botun bu sunucuya erişimi yok.' });
        }

        // fetch yerine cache.get kullanıldı, ancak tam bilgi için fetch önerilir
        const member = await guild?.members.fetch(userId).catch(() => null); 

        if (!member) {
            return res.status(404).json({ error: `Kullanıcı (${user.tag}) bu sunucuda bulunamadı.` });
        }

        const badgeMap = {
            Staff: "Discord Çalışanı", Partner: "Discord Partner", Hypesquad: "HypeSquad", 
            BugHunterLevel1: "Hata Avcısı Seviye 1", BugHunterLevel2: "Hata Avcısı Seviye 2", 
            HypeSquadOnlineHouse1: "HypeSquad Bravery", HypeSquadOnlineHouse2: "HypeSquad Brilliance", 
            HypeSquadOnlineHouse3: "HypeSquad Balance", PremiumEarlySupporter: "Erken Destekçi", 
            VerifiedDeveloper: "Onaylı Geliştirici", CertifiedModerator: "Sertifikalı Moderatör", 
            ActiveDeveloper: "Aktif Geliştirici", VerifiedBot: "Doğrulanmış Bot"
        };

        const userFlags = user.flags?.toArray() || [];
        let badges = userFlags.map(badge => badgeMap[badge] || badge);

        if (member.id === guild.ownerId && !badges.includes("Sunucu Sahibi")) {
            badges.push("Sunucu Sahibi");
        } else if (member.permissions.has(PermissionsBitField.Flags.Administrator) && !badges.includes("Yönetici")) {
            badges.push("Yönetici");
        }
        if (user.bot && !badges.includes("Bot")) { 
            badges.unshift("Bot"); 
        }
        if (member.premiumSince && !badges.includes("Sunucu Destekçisi")) {
            badges.push("Sunucu Destekçisi");
        }

        const getUserActivity = (mem) => {
            if (!mem.presence?.activities?.length) return ["Yok"];
            return mem.presence.activities.map(activity => {
                switch (activity.type) {
                    case 0: return `Oynuyor: ${activity.name}`; 
                    case 1: return `Yayınlıyor: ${activity.name} (${activity.url || "Bilinmiyor"})`; 
                    case 2: return `Dinliyor: ${activity.details || activity.name} ${activity.state ? `(${activity.state})` : ""}`; 
                    case 4: return `✨ Özel Durum: ${activity.state || "Bilinmiyor"}`; 
                    case 5: return `Yarışıyor: ${activity.name}`; 
                    default: return activity.name;
                }
            });
        };

        const userData = {
            userId: user.id,
            username: user.tag,
            avatar: user.displayAvatarURL({ dynamic: true, size: 256 }),
            banner: user.bannerURL({ dynamic: true, size: 512 }) || null,
            joinDate: member ? new Date(member.joinedTimestamp).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' }) : null,
            createdDate: new Date(user.createdTimestamp).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' }), 
            badges: badges.length > 0 ? badges : [], 
            roles: member ? member.roles.cache.filter(r => r.name !== "@everyone").map(r => ({ name: r.name, color: r.hexColor })) : [],
            roleCount: member ? member.roles.cache.size - 1 : 0,
            boostingSince: member?.premiumSince ? new Date(member.premiumSinceTimestamp).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' }) : null,
            status: member?.presence?.status || "offline",
            activities: member ? getUserActivity(member) : ["Yok"],
            guildName: guild?.name || "Bilinmiyor"
        };

        res.json(userData);
    } catch (error) {
        console.error(`API hatası (userId: ${req.params.userId}, guildId: ${req.params.guildId}):`, error);
        res.status(500).json({ error: 'Sunucu hatası oluştu. Botun yetkilerinin tam olduğundan ve sunucuda bulunduğundan emin olun.' });
    }
});

// Vercel için bu satır gereklidir. App'i dışa aktarır.
module.exports = app;

// Bu app.listen satırı Vercel'de gereksizdir ve kendi kendine kapanır, ancak zarar vermez.
// Sadece yerel test yaparken Express sunucusunu başlatır.
// app.listen(3000, () => console.log('API 3000 portunda çalışıyor'));
