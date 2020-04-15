const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')//获取x

const xObject = JSON.parse(x)

const hashMap = xObject || [
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'D', url: 'https://developer.mozilla.org' },
    { logo: 'G', url: 'https://www.github.com' },
    { logo: 'I', url: 'https://www.iconfont.cn' },
    { logo: 'W', url: 'https://wangdoc.com' },
    { logo: 'Z', url: 'https://www.zhihu.com' },
]

const simplifyUrl = (url) => {
    return url = url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')

}
const render = () => {

    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">
                    ${node.logo}
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close">
                    </use>
                </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {

            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {

            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
hashMap.sort(compare)
render()

$('.addButton').on('click', () => {

    let url = window.prompt('请问你要添加的网址是什么？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }

    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    hashMap.sort(compare)
    render()
});

window.onbeforeunload = () => {

    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)

}
const compare = (a, b) => {
    let textA = a.logo.toUpperCase();
    let textB = b.logo.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
};

$(document).on('keypress', (e) => {

    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }

})
