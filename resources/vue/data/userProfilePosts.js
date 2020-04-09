export default [
    {
        id: 1, /** в смысле Id поста */
        posterName: `Маргарита Соболева`,
        posterPic: ``,
        postText: `Я не могу сказать, что я отношусь к категории гордых людей, я скорее всего с категории взаимных. Для меня важно чувствовать необходимость, теплое отношение и заботу.`,
        dtLabel : `2020-04-07 18:32:00`,
        isMine: false,
        isLiked: false,
        isDisliked: false,
        viewsNumber: Math.floor(Math.random() * 1000),
        commentsNumber: Math.floor(Math.random() * 100),
        sharesNumber: Math.floor(Math.random() * 100),
        likesNumber: Math.floor(Math.random() * 200),
        dislikesNumber: Math.floor(Math.random() * 500),
        images : [
            {
                id: 1, /** в смысле Id фотки */
                path: 'https://steamuserimages-a.akamaihd.net/ugc/792010418808130635/0C2E84419B15539C2E27F43B45F9DBB277F2683B/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 2,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/792010418808130585/980E17AA6CF29E06865DA40F9067B9164AB54BCD/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 3,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/792010418808130635/0C2E84419B15539C2E27F43B45F9DBB277F2683B/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
        ],
        comments : [
            {
                id: 111, /** id камента **/
                dtLabel : `2020-04-04 18:34:00`,
                commentorName : `Максим`,
                commentorPic : ``,
                commentText: `Пришествие дьявола сопровождается ростом аномальных происшествий и падением скота?`,
                isLiked: false,
                isDisliked: false,
                likesNumber: Math.floor(Math.random() * 200),
                dislikesNumber: Math.floor(Math.random() * 500),
            },
            {
                id: 112, /** id камента **/
                dtLabel : `2020-04-04 19:32:00`,
                commentorName : `Алина`,
                commentorPic : ``,
                commentText: `Максим, как так можно-то?`,
                isLiked: true,
                isDisliked: false,
                likesNumber: Math.floor(Math.random() * 200),
                dislikesNumber: Math.floor(Math.random() * 500),
            },
            {
                id: 112, /** id камента **/
                dtLabel : `2020-04-07 19:45:00`,
                commentorName : `Рустам`,
                commentorPic : ``,
                commentText: `Алина, Хороший подлоКОТник`,
                isLiked: false,
                isDisliked: true,
                likesNumber: Math.floor(Math.random() * 200),
                dislikesNumber: Math.floor(Math.random() * 500),
            },
        ]
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    {
        id: 2, /** в смысле Id поста */
        posterName: `Юрий Никулин`,
        posterPic: ``,
        postText: `Нынешнее здание Днепровского цирка было построено в 1980 году по проекту архитектора Павла Ниринберга. Здание выполнено в виде цирка шапито и имеет уникальную конструкцию из сборного железобетона.

Торжественное открытие цирка состоялось 24 декабря 1980 года.

Здание цирка получилось настолько характерным, что в 1980-1990 годы стал неофициальным символом города - его часто изображали на значкам и открытках с видами города.
Ввиду того, что сохранилось неработающее здание прежнего (старого) цирка, новый цирк так часто и называли - "Новым цирком".
Тем более что "Новый цирк" находится возле "Нового" моста через реку Днепр.

Это единственный в Украине цирк с дополнительным репетиционным манежем.
В цирке также есть специальные помещения для животных – конюшни, вольеры, клетки и многое другое.
В разное время на его арене выступали Игорь Кио, Юрий Куклачёв, Юрий Никулин, Олег Попов, Вальтер Запашный, Владимир Шевченко, Людмила Шевченко, представители династии Дуровых и другие известные артисты.`,

        dtLabel : `2019-07-23 18:32:00`,
        isMine: true,
        isLiked: false,
        isDisliked: false,
        viewsNumber: Math.floor(Math.random() * 1000),
        commentsNumber: Math.floor(Math.random() * 100),
        sharesNumber: Math.floor(Math.random() * 100),
        likesNumber: Math.floor(Math.random() * 200),
        dislikesNumber: Math.floor(Math.random() * 500),
        images : [
            {
                id: 11, /** в смысле Id фотки */
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788626362664388477/F4C5E22AF4B2B3759C49B4FED3974A1370B425B0/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 12,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788626362664385196/8543E03CAF74BA01382B88F5570B24DC86DC0EF9/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 13,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788626362664385118/4823043ACBD0FD46FA687C90392B9323993DC136/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 14,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788626362664385211/749E88DD53576028652019D92FFCEBCE049A96E5/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
        ],

        comments : []
    },


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    {
        id: 3, /** в смысле Id поста */
        posterName: `Иван Куличенко`,
        posterPic: ``,
        postText: `Первоначальный проект архитектора Клода Геруа был утверждён в 1786 году.

Планировалось, что своими размерами 150x45 метров Спасо-Преображенский собор будет больше, чем собор Святого Павла в Риме.
Князь Потёмкин лично указал увеличить высоту здания на один аршин, чтобы это собор был выше собора Святого Павла.

Во время «таврического» вояжа императрицы Екатерины II в 1787 году, при основании Екатеринослава, в фундамент собора был заложен первый камень. При этом также присутствовал австрийский император Иосиф II, он заложил второй камень в фундамент собора.

Повторная закладка собора произошла в 1830 году. На этот раз собор уменьшился в размере в шесть раз.
Строительство Спасо-Преображенского собора было завершено в 1835 году.

Построен собор был в стиле классицизма, по проекту Андреяна Захарова, который разработал проект в 1805-1806.

Спасо-Преображенский собор стал вторым каменным зданием в Екатеринославе (первым был Потёмкинский дворец).
До революции 1917 года был самым большим собором в Екатеринославе.

В 1930 году собор был закрыт, в здании был организован Музей атеизма.
Во время Великой Отечественной войны собор пострадал. После реконструкции, которая завершилась в 1976 году, в здании собора был открыт Музей истории религии и атеизма.

В 1992 году здание собора было возвращено церкви.`,

        dtLabel : `2020-04-09 07:47:00`,
        isMine: false,
        isLiked: true,
        isDisliked: false,
        viewsNumber: Math.floor(Math.random() * 1000),
        commentsNumber: Math.floor(Math.random() * 100),
        sharesNumber: Math.floor(Math.random() * 100),
        likesNumber: Math.floor(Math.random() * 200),
        dislikesNumber: Math.floor(Math.random() * 500),
        images : [
            {
                id: 21, /** в смысле Id фотки */
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788624386988845492/2ADAA7F510D2B80DB4029E12C67018951A841099/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 22,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788624386988845629/81F4F29355BF8108C97E9F255897B21DE0ABCB65/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 23,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788624386988845748/19E68500B369CA8445F958E0FFF1934BDB1AC9FF/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 24,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/788624386988845764/BA53CCEF5B36917E23F53F63210C476B15A7D980/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            // {
            //     id: 24,
            //     path: 'https://steamuserimages-a.akamaihd.net/ugc/788624386988848178/704A146A2496C590FCC7066A1211587CFECF16B3/',
            //     name : ``,
            //     w: 1600,
            //     h: 900,
            //     viewsNumber: Math.floor(Math.random() * 1000),
            //     commentsNumber: Math.floor(Math.random() * 50),
            //     sharesNumber: Math.floor(Math.random() * 100),
            //     likesNumber: Math.floor(Math.random() * 100),
            //     dislikesNumber: Math.floor(Math.random() * 50),
            // },
        ],

        comments : []
    },

    {
        id: 4, /** в смысле Id поста */
        posterName: `Маргарита Соболева`,
        posterPic: ``,
        postText: `Я не могу сказать, что я отношусь к категории гордых людей, я скорее всего с категории взаимных. Для меня важно чувствовать необходимость, теплое отношение и заботу.`,
        dtLabel : `2020-04-07 18:32:00`,
        isMine: true,
        isLiked: false,
        isDisliked: false,
        isArchived: true,
        viewsNumber: Math.floor(Math.random() * 1000),
        commentsNumber: Math.floor(Math.random() * 100),
        sharesNumber: Math.floor(Math.random() * 100),
        likesNumber: Math.floor(Math.random() * 200),
        dislikesNumber: Math.floor(Math.random() * 500),
        images : [
            {
                id: 1, /** в смысле Id фотки */
                path: 'https://steamuserimages-a.akamaihd.net/ugc/792010418808130635/0C2E84419B15539C2E27F43B45F9DBB277F2683B/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 2,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/792010418808130585/980E17AA6CF29E06865DA40F9067B9164AB54BCD/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
            {
                id: 3,
                path: 'https://steamuserimages-a.akamaihd.net/ugc/792010418808130635/0C2E84419B15539C2E27F43B45F9DBB277F2683B/',
                name : ``,
                w: 1600,
                h: 900,
                viewsNumber: Math.floor(Math.random() * 1000),
                commentsNumber: Math.floor(Math.random() * 50),
                sharesNumber: Math.floor(Math.random() * 100),
                likesNumber: Math.floor(Math.random() * 100),
                dislikesNumber: Math.floor(Math.random() * 50),
            },
        ],
        comments : [
            {
                id: 111, /** id камента **/
                dtLabel : `2020-04-04 18:34:00`,
                commentorName : `Максим`,
                commentorPic : ``,
                commentText: `Пришествие дьявола сопровождается ростом аномальных происшествий и падением скота?`,
                isLiked: false,
                isDisliked: false,
                likesNumber: Math.floor(Math.random() * 200),
                dislikesNumber: Math.floor(Math.random() * 500),
            },
            {
                id: 112, /** id камента **/
                dtLabel : `2020-04-04 19:32:00`,
                commentorName : `Алина`,
                commentorPic : ``,
                commentText: `Максим, как так можно-то?`,
                isLiked: true,
                isDisliked: false,
                likesNumber: Math.floor(Math.random() * 200),
                dislikesNumber: Math.floor(Math.random() * 500),
            },
            {
                id: 112, /** id камента **/
                dtLabel : `2020-04-07 19:45:00`,
                commentorName : `Рустам`,
                commentorPic : ``,
                commentText: `Алина, Хороший подлоКОТник`,
                isLiked: false,
                isDisliked: true,
                likesNumber: Math.floor(Math.random() * 200),
                dislikesNumber: Math.floor(Math.random() * 500),
            },
        ]
    },
];
