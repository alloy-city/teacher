import * as Live from './live'
import { logout } from './auth/logout'
import * as Student from './student'
import * as Course from './course'
import * as Mission from './mission'
import * as Lesson from './lesson'
import * as Product from './product'

let d = new Date();

if (d.getDate() >= 20 && d.getMonth() == 11 && d.getYear() == 119) {
    switch (Auth.userData._id) {
        case "58612e8c03de743148b2cb36":
            notify(`<p>👅🍑👄😏</p>`, "info", true);
            break;
        case "5b59ea23fb645e465d3748fb":
            notify(`<h3>Yo </h3><p>🚀</p>
            `, "info", true);
            break;
        case "5c902e9ca900bf4873e3041a":
            notify(`<h3>Ma chère Aída</h3><p>Merci d’avoir partagé 2019 avec moi, avec Pantoufle et les dizaines de padawans. Je sais que ça a été une année pleine de défis pour toi. Je te souhaite une belle année 2020, légère et pleine de joie.</p><p>Ah, il y a un petit cadeau symbolique sur ton compte bancaire, on espère que tu en feras bon usage 😉</p><p>Gros bisous,</p><p class="text-right"><i>Cecília - CEO</i></p>
            `, "info", true);
            break;
        case "592caaa19ca1d812e85180e7":
            notify(`<h3>Maria, ma belle !</h3><p>Encore une nouvelle année de partages. Merci d’être toujours là chez Pantoufle. On a fait du chemin ensemble, hein ! Je suis très contente et fière de toi, ton DALF, ton séjour en France. Je souhaite que 2020 t’apporte beaucoup plus de belles choses et de réalisations !</p><p>Ah, il y a un petit cadeau symbolique sur ton compte bancaire, on espère que tu en feras bon usage 😉</p><p>Gros bisous,</p><p class="text-right"><i>Cecília - CEO</i></p>`, "info", true);
            break;
        case "5a5a4e5a44fe5a48b79ab855":
            notify(`<h3>Mec !!</h3><p>Merci pour encore une belle année pleine d’élèves qui ont réussis, pleine d’amitié et de support. Pantoufle et les padawans ont vraiment de la chance de t’avoir avec ton expertise, ta bonne humeur et ton engagement. Que 2020 soit plein de bonne bouffe, de bon vin et de bons amis. Mais aussi de nouveaux défis professionnels 😋</p><p>Ah, il y a un petit cadeau symbolique sur ton compte bancaire, on espère que tu en feras bon usage 😉</p><p>Bises,</p><p class="text-right"><i>Cecília - CEO</i></p>`, "info", true);
            break;
        case "586d7203bba46a2fcc4c7191":
            notify(`<h3>Sel, meu braço esquerdo!</h3><p>Que ano, hein! Foi muito bom poder compartilhar uma boa parte dele contigo. Você foi a melhor aposta que fiz nos últimos anos. E não decepcionou! Parabéns, eu sou uma pessoa exigente [U+1F609]. E obrigada por ajudar a gente a fazer esse negócio todo funcionar. Que 2020 venha leve e alegre, mas sem esquecer da produtividade 😉 (Aquela mensagem meio da chefe, meio da amiga-cunhada).</p><p>Ah, tem um presentinho simbólico na tua conta bancária. Esperamos que você usará com sabedoria 😉</p><p>Gros bisous,</p><p class="text-right"><i>Cecília - CEO</i></p>`, "info", true);
            break;
        case "5a5a3ce744fe5a48b79ab854":
            notify(`<h3>Sheila, ma belle !</h3><p>Merci pour cette année de partage et d’engagement envers Pantoufle et les dizaines de padawans. C’est super de t’avoir parmi nous avec ton sourire, même quand il te manque la voix 😋 Prends soin de toi, hein ! Je te souhaite une belle année 2020, pleine de réalisations, de joie et de samba !</p><p>Ah, il y a un petit cadeau symbolique sur ton compte bancaire, on espère que tu en feras bon usage 😉</p><p>Gros bisous,</p><p class="text-right"><i>Cecília - CEO</i></p>`, "info", true);
            break;
        default:
            break;
    }
}

window.Teacher = {
    Live,
    Course,
    Student,
    logout,
    Mission,
    Lesson,
    Product
}