const RestError = require("./restError");
const addUser = async function (req, res, next){
    try {
        const {name, username, avatar} = req.body;
        if (!(name && name.length > 2 && username && username.length > 2 && avatar && avatar.startsWith("http"))) {
            throw new RestError("Все поля ввода должны иметь длину больше 2, а avatar должен быть ссылкой", 400);
        }
        const user = {
            id: this.users.length + 1,
            name,
            username,
            avatar
        };
        this.users.push(user);
        res.data = user;
        res.statusCode = 201;
        next();
    } catch(err){
        next(err);
    }
};

const getAllUsers = async function(req, res, next){
    try{
        res.data = this.users;
        next();
    } catch(err){
        next(err);
    }
}
const Users = {
    users: [{
        id: 1,
        name: "Anakin Skywalker",
        username: "@dartvader",
        avatar: "https://scontent.fiev22-2.fna.fbcdn.net/v/t1.0-9/12540707_1021018771274839_7272974277184200398_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=BhI_QAqxlaUAX88XqYe&_nc_ht=scontent.fiev22-2.fna&oh=f95fb2eba193d7f4c8885aa5705ca8e8&oe=5EC5B8DA"
    }, {
        id: 2,
        name: "Master Yoda",
        username: "@littlegreenpug",
        avatar: "https://upload.wikimedia.org/wikipedia/ru/thumb/9/96/CGIYoda.jpg/280px-CGIYoda.jpg"
    }, {
        id: 3,
        name: "Obi-Wan Kenobi",
        username: "@dartmol_lox",
        avatar: "https://vignette.wikia.nocookie.net/ru.starwars/images/7/71/Kenobi_from_Kenobi.png/revision/latest?cb=20180105122803"
    }],
};
Users.addUser = addUser.bind(Users);
Users.getAllUsers = getAllUsers.bind(Users);

module.exports = Users;