//Axios
import axios from "axios";

// Acessa o pacote
import Discord from "discord.js";
import { Intents, MessageEmbed } from 'discord.js';

// Guarda o token
import { token, keyAcessUnsplash } from './config.js';

//Client do bot
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    console.log("Estou pronto!");
});

// Seta o prefixo
const prefix = ".";

// Funções
const mensagem = (urlImagem) => {
    // Mensagem de Foto
    const mensagemFoto = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Kassinão')
        .setURL('https://discord.js.org/')
        .setAuthor({ name: 'Kassinão', iconURL: 'https://i.imgur.com/VGvnZpx.jpg', url: 'https://discord.js.org' })
        .setDescription('Aqui está sua imagem')
        .setImage(urlImagem)
        .setTimestamp()
        .setFooter({ text: 'Direitos reservados Kassinão ©', iconURL: 'https://i.imgur.com/VGvnZpx.jpg' });

    return mensagemFoto;
}

// Mensagem de help
const mensagemHelp = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Kassinão')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Kassinão', iconURL: 'https://i.imgur.com/VGvnZpx.jpg', url: 'https://discord.js.org' })
    .setDescription('Kassinão o rei do momento')
    .addFields(
        { name: '.hora', value: 'Mostra a hora atual' },
        { name: '.soma', value: 'Soma os números que você mandar' },
        { name: '.cc', value: 'Joga cara ou coroa' },
        { name: '.imagem', value: 'Envia uma imagem aleatória' },
    )
    .setImage('https://i.imgur.com/VGvnZpx.jpg')
    .setTimestamp()
    .setFooter({ text: 'Direitos reservados Kassinão ©', iconURL: 'https://i.imgur.com/VGvnZpx.jpg' });

// Mensagens fixas

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === 'kassinão?' || msg.content.toLowerCase() === 'kassinao?') {
        message.channel.send('https://www.youtube.com/watch?v=LCDaw0QmQQc')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === 'eu te amo kassinão' || msg.content.toLowerCase() === 'eu te amo kassinao') {
        message.channel.send('https://www.youtube.com/watch?v=LCDaw0QmQQc')
    }
})

// Comandos

client.on("messageCreate", async function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    //Comando para ver a hora
    if (command === "hora") {
        const Hora = new Date().toLocaleTimeString();
        message.channel.send(`Agora são ${Hora}`);
    }




    //Comando de soma
    else if (command === "soma") {
        //Verifica se há argumentos
        if (args == '') {
            message.channel.send('Não dá pra somar nada!')
        }
        else {
            const numArgs = args.map(x => parseFloat(x));

            //Verifica se há argumentos o suficiente
            if (numArgs.length == 1) {
                message.channel.send('Não dá pra somar um numéro só!')
            }
            else {
                const sum = numArgs.reduce((counter, x) => counter += x);
                message.channel.send(`A soma dos seus números é ${sum}!`);
            }
        }
    }




    //Cara ou coroa
    else if (command == "cc") {
        const jogarMoeda = Math.random() * 101;
        console.log(jogarMoeda)

        if (args.length == 0 || args.length > 1) {
            if (args.length == 0) {
                message.channel.send(`Mande cara ou coroa ${message.author}!`)
            }
            else {
                message.channel.send(`Não mande mais de uma opção ${message.author}!`)
            }
        }
        else {
            if (jogarMoeda <= 50 && args[0].toLowerCase() == "coroa") {
                message.channel.send(`Coroa ganhou e você também ${message.author}!`)
            }
            else if (jogarMoeda <= 50 && args[0].toLowerCase() == "cara") {
                message.channel.send(`Coroa ganhou e você perdeu ${message.author}!`)
            }
            else if (jogarMoeda > 50 && args[0].toLowerCase() == "cara") {
                message.channel.send(`Cara ganhou e você também ${message.author}!`)
            }
            else {
                message.channel.send(`Cara ganhou e você perdeu ${message.author}!`)
            }
        }
    }


    //Retorna uma imagem aleatória
    else if (command == "imagem") {
        let res = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${keyAcessUnsplash}`);
        let data = res.data;
        const lma = data.urls.raw;
        const mensagemFoto = mensagem(lma)
        message.channel.send({ embeds: [mensagemFoto] })
    }



    //Help lista os comandos
    else if (command == "ajuda") {
        message.channel.send({ embeds: [mensagemHelp] });
    }



    //caso o comando dado não exista
    else {
        message.channel.send('Digite .ajuda para saber os comandos')
    }
});

// Loga no discord
client.login(token);