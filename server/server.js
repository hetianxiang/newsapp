let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let path = require('path');
let url = require('url');
let fs = require('fs');
let app = express();
let port = 3000;
//---------数据模块-------------
let sliders = require('./mock/sliders');
// let brands = require('./mock/brands');
// let menuInfos = require('./mock/menuInfos');
// let blockInfos = require('./mock/blockInfos');
//----------------------------end
app.use(bodyParser.json());
app.use(session({
    resave: true, //每次访问都会重新保存 session
    saveUninitialized: true, //保存未初始化的session
    secret: 'aixianfeng' //密钥
}));

app.use(function (req, res, next) {
    //允许的来源
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    //允许客户端请求的方法
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    //允许客户端发送的请求头
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //允许客户端发送Cookie
    res.header('Access-Control-Allow-Credentials', 'true');
    //允许客户端向服务器发post跨域的时候，会先发送OPTIONS请求。如果服务器返回的响应头Access-Control-Allow-Methods里有POST的话，才会再次发送post请求
    if (req.method == 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});
app.listen(port, () => (console.log('监听' + port + '端口成功!!') ));

//加载静态资源文件
app.use(express.static(path.join(__dirname, '../static')));
//获取轮播图
app.get('/sliders', function (req, res) {
    res.json(sliders);
});
//获取brands图
app.get('/brands', function (req, res) {
    res.json(brands);
});
//获取menuInfos数据
app.get('/menuInfos', function (req, res) {
    res.json(menuInfos);
});

function getMarket(cb) {
    fs.readFile('./mock/market.json', 'utf-8', function (err, data) {
        if (err || data.length === 0) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

function writeMarket(cb) {
    fs.writeFile('./mock/market.json', JSON.stringify(data), cb);
}
//获取超市数据
app.get('/market', function (req, res) {

    let {query} = url.parse(req.url, true);
    let typeid = query.typeid || 0;

    getMarket(function (markets) {
        let market = markets.find((item, index) =>
            item.typeid == typeid
        );
        res.send(market);
    });
});

//获取blockInfos数据
app.get('/blockInfos', function (req, res) {
    res.json(blockInfos);
});
// ------------注册 登录---------------------------
//注册
app.post('/signUp', function (req, res) {
    fs.readFile('./mock/userInfo.json', 'utf-8', function (err, data) {
        data = data.JSON.parse(data);
        //动态给计算用户id ，在原来的基础上+1
        let reqStr = '';
        req.on('data', function (chunk) {
            reqStr += chunk;
        });
        req.on('end', function () {
            reqStr = JSON.parse(reqStr);
            reqStr['id'] = data.length === 0 ? 1 : parseFloat(data[data.length - 1]['id']) + 1;
        });
        let user = req.body;
        let oldUser = data.find((item) => item.username == user.username);
        if (oldUser) {
            res.json({code: 1, error: '用户名已存在啦！'});
        } else {
            data.push(reqStr);
            fs.writeFile('./mock/userInfo.json', JSON.stringify(data), 'utf-8', function (err) {
                if (err) {
                    res.json({code: 1, error: '用户信息写入失败！！'})
                } else {
                    res.json({code: 0, success: '注册成功'});
                }
            });
        }
    });
});
//登录
app.post('/login', function (req, res) {
    fs.readFile('./mock/userInfo.json', 'utf-8', function (err, data) {
        if (err) {
            res.json({code: 1, error: "读取数据库失败"});
        }
        data = data.JSON.parse(data);
        let user = req.body;
        let oldUser = data.find((item) => item.username == username && item.password == user.password);
        if (oldUser) {//用户名密码匹配
            req.session.user = user; //把登录成功的对象写入session中
            res.json({code: 0, success: "hi~欢迎回来"});
        } else {
            res.json({code: 1, success: '用户名或者密码错误!'});
        }
    });
});
//当应用初始化的时候，会向后台发送一个请求，询问当前用户是否登录，如果登录的话则返回登录的用户并存放在仓库里。
app.get('/validate', function (req, res) {
    if (req.session.user) {//如果会话对象中有user的话，表示已登录
        res.json({code: 0, user: req.session.user});
    } else {
        res.json({code: 1});
    }
});
//-------------------------------------------------end----------------
// 添加用户地址
app.post('/addAddress', function (req, res) {
    //
});
// 提交订单
app.post('/submit', function (req, res) {
    //
});


//------------------------------------------------------------------------------
////获取用户购物车列表
function getCartList(cb) {
    fs.readFile('./mock/cart.json', 'utf-8', (err, data) => {
        if (err) {
            return;
        }
        cb(data);
    })
}

//添加到购物车列表
function addCart(cart, userCart, cb) {
    fs.writeFile('./mock/cart.json', JSON.stringify(cart), function (err) {
        if (err) {
            cb && cb({
                code: 100,
                error: '添加失败，请稍后重试。'
            })
        } else {
            cb && cb(userCart)
        }
    })
}
//添加购物车
app.post('/api/cartlist', (req, res) => {
    let cart = req.body;
    //console.log(cart);
    let userCart;
    // console.log(cart,'000');
    getCartList(data => {
        let cartList = JSON.parse(data);
        console.log(111111, cartList);
        if (!cartList) cartList = [];
        cartList = cartList.map(item => {
            if (cart.tel == item.tel) {
                return {
                    ...cart
                };
            } else {
                return item;
            }
        });
        //console.log(2222,cartList);
        userCart = cartList.find(item => item.tel == cart.tel);
        // console.log(333,userCart);
        if (!userCart) {
            userCart = {
                // tel: cart.tel,
                // cartList: cart.data
                ...cart
            }
            cartList.push(userCart);
        }
        addCart(cartList, {code: 200, data: {...userCart}}, data => res.send(data))
    });

});

//获取购物车
app.get('/api/cartlist', (req, res) => {

    let query = url.parse(req.url, true).query;
    // console.log(query);
    getCartList(data => {
        let cartList = JSON.parse(data);
        //  console.log(cartList);
        let userCart = cartList.find(item => {
            return item.tel == query.tel
        })
        console.log(11, userCart);
        if (!userCart) {
            userCart = {
                tel: query.tel,
                data: []
            };
            res.send({code: 200, data: []})

        } else {

            res.send({code: 200, data: {...userCart}})
        }
    })
});
//-----------------------------------------------------------------


// 注册登录
//获取数据
function getData(cb) {
    fs.readFile('./mock/userData.json', 'utf8', function (error, data) {
        if (error || data.length === 0) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}
//写进去数据
function writeBook(data, cb) {
    fs.writeFile('./mock/userData.json', JSON.stringify(data), cb);
}

app.post('/api/signIn', function (req, res) {
    console.log('111');
    let result = {};
    getData(function (users) {
        console.log('222');
        let user = req.body;

        let newUser = users.find((item) => item.phone == user.phone);
        if (newUser) {
            result.user = newUser;
            result.code = 0;
            res.json(result);
        } else {
            user.userId = users.length ? users[users.length - 1].userId + 1 : 1;
            users.push(user);
            writeBook(users, function () {
                result.user = user;
                result.code = 0;
                res.json(result);
            })
        }
    })
});


//search
app.get('/search', function (req, res) {
    let {str} = url.parse(req.url, true).query;
    console.log(str);
    let blockInfos = require('./mock/blockInfos.js');
    if (str == '' || !str) {
        res.send({code: 100, error: ''});
    } else {
        let reg = new RegExp(str);
        console.log(reg);
        let product = blockInfos.block1.products.filter(item => {
            let isFilter = item.tag && item.tag.find(item => {
                    let reg2 = new RegExp(item);
                    console.log(reg.test(item), reg2.test(str));
                    return reg.test(item) || reg2.test(str);
                });
            return isFilter;
        });
        res.send(product)
    }
});
