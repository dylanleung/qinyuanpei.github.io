/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","6eb86ef941eb970f2cdf8a557dd927e0"],["about/index.html","90a545d668bed57de198ae61815e0ac6"],["archives/2014/12/index.html","387ce006ec2db30b4bc4bb37a7234126"],["archives/2014/index.html","b0fae14fd11216eb38c271b59ce8b592"],["archives/2015/01/index.html","26f09b6daebe2ca844943d1798d89ff8"],["archives/2015/02/index.html","2dec23298af7f2a0ef68a38bab2f9cd2"],["archives/2015/03/index.html","60a655a7213bbdf6bc04ea55926a8b11"],["archives/2015/04/index.html","3d76963b583b3db6eb12b706f45de738"],["archives/2015/05/index.html","af55e020b01dabe7a29ea000eed55481"],["archives/2015/06/index.html","a6d88e0d5a75756bfba431bc20f21d9e"],["archives/2015/07/index.html","9b6b34ec2bc7b8bd4b179b41504b4d24"],["archives/2015/08/index.html","6e824a153bd061e16a5105f7618be920"],["archives/2015/09/index.html","1e23d1759feb1bb7aab88468611d66f1"],["archives/2015/10/index.html","daad7cd38c206aeb1d03f2f7e157863b"],["archives/2015/11/index.html","28e7c25b9439bb331eb7e730e6528fbf"],["archives/2015/12/index.html","197501f91683bb72a65ae2a94a12ccbf"],["archives/2015/index.html","349f836125aaf25d5646cbc8596bcc96"],["archives/2015/pages/2/index.html","c5da796e9be2f17699215c22654f29e4"],["archives/2015/pages/3/index.html","89b5dae2aa3d5169618d633c4906d0a8"],["archives/2015/pages/4/index.html","abab6219a21ed78cc2559ffe1b5ca11f"],["archives/2015/pages/5/index.html","93a1186e8d17322e164e5df412f29b9c"],["archives/2015/pages/6/index.html","5e20db3b95b485ae1e3404f487ae5a87"],["archives/2016/01/index.html","48e6945e6d04325eb65f2636b524f0da"],["archives/2016/03/index.html","edf81a0fc4b55c8e9e18d5156ec824f4"],["archives/2016/05/index.html","85fc922a2fd0b57f053dc57102030544"],["archives/2016/06/index.html","6e2072bd6db86a2352dbac7fa4ca47fc"],["archives/2016/07/index.html","650b20421533005a008c141bafb27069"],["archives/2016/09/index.html","249509ff19af73fab146a5d36a7f36c9"],["archives/2016/10/index.html","2a2980dbff5a856670ae2a03b7d1bf78"],["archives/2016/11/index.html","10e57112dc5cef03cf6f2114068aadfb"],["archives/2016/index.html","818189542384796161958fde80c603ad"],["archives/2016/pages/2/index.html","56fd3a28caa9f6447b080e202380f2d0"],["archives/2016/pages/3/index.html","1c32cec9595ebb127fe1fbf0a290c4bb"],["archives/2017/02/index.html","b3abb1aa61aa1d951832879a44dfd052"],["archives/2017/03/index.html","e4c81d5d705661a9e4bc2d2b23a97d1d"],["archives/2017/04/index.html","48cdf06d642c6b50bf61c5e081a9c06d"],["archives/2017/05/index.html","2b4b205c209aba54cd453c81b7f0299e"],["archives/2017/07/index.html","0aadfcbec655576b0e65f64e89331a7f"],["archives/2017/08/index.html","f9100f55aa66064ac64c0e42ee0f4b3a"],["archives/2017/09/index.html","9de5d9439f37d1e8ba5ee94c6d33aa9c"],["archives/2017/10/index.html","5825be1879515fd0a6200b9a7c19efe9"],["archives/2017/11/index.html","d34ec69eafa33193718cc9e79db7a741"],["archives/2017/12/index.html","d8bd071c7fe04b5d61d683148a2aceb6"],["archives/2017/index.html","d837473e18c222aedaedc5f8d784a496"],["archives/2017/pages/2/index.html","792f9bf1efb53bd92e3fb336730f0c96"],["archives/2018/01/index.html","1988571b2327dc980009090613004bb0"],["archives/2018/02/index.html","1aa41870d4d32ffc59e7c38ff9e59f8e"],["archives/2018/03/index.html","ef38dc60d42d19d14d202cb0a8c15ba7"],["archives/2018/04/index.html","cfd480a3b793a9d9991da48d3c889f78"],["archives/2018/05/index.html","90dff88311f69f1fecd8fb43733d3603"],["archives/2018/06/index.html","825e1bc66f5915a2230877b69810d0b0"],["archives/2018/07/index.html","a495799268ddf9bd7e489ab5eaee83f8"],["archives/2018/08/index.html","b48728a92589717f7c7bdb6cdbeef0fc"],["archives/2018/09/index.html","a79ff98c8c74f0ec91b63a2873694c51"],["archives/2018/10/index.html","0e1131dc4c0762278c227d66adf6a7a4"],["archives/2018/index.html","2393822946f464a564848d96f406408a"],["archives/2018/pages/2/index.html","c21cf5a42be97a3336506ce852e9c7cf"],["archives/2018/pages/3/index.html","bf3a9ce181d9bf4429517826dc1ab6ae"],["archives/2018/pages/4/index.html","7bc5031b9f95ea48a24803ce96740ce7"],["archives/index.html","05d9fea030600d7f8f92099a026ff126"],["archives/pages/10/index.html","ab5d874f1ea4ec6365a3d1e61e00c0d8"],["archives/pages/11/index.html","21fe8ebb0fc52ff5c27346914aab989b"],["archives/pages/12/index.html","cad5d87a8c31a2ace107099e0d0fd939"],["archives/pages/13/index.html","5057285624c892ed3ee83af2ee1593c7"],["archives/pages/2/index.html","bbd9ba7e948aa9a7fcbf6c2bec70f636"],["archives/pages/3/index.html","7070f17d03ea0cef2b94c182b10650e0"],["archives/pages/4/index.html","0a5a53d128d5ed0306c88ef10f1fec22"],["archives/pages/5/index.html","6d21a30bee5b2c96b538bedf34e3e498"],["archives/pages/6/index.html","ab9ee22fd7a7052df20fbbd79a7c127f"],["archives/pages/7/index.html","05d8b168016c4511a59200eb29f224e2"],["archives/pages/8/index.html","ba25173f50a9211e5c76ca59920edb28"],["archives/pages/9/index.html","ccd690e1d4e6c3930a0e0571d988338e"],["assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["assets/douban-loading.gif","b86c6b435fc25c1366acaafc3fb5c252"],["assets/images/Golden_Gate.png","77b27f25f3f8c397bf55605410a83ac7"],["assets/images/alipay.jpg","68b81d440a463432623c7181a1481bdc"],["assets/images/avatar.jpg","7a1be7eef7956fd73fa1c02e0079390c"],["assets/images/brand.jpg","734f817bbb181d0180d7b37749769cc0"],["assets/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["assets/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["assets/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["assets/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["assets/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["assets/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["assets/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["assets/images/cc.png","40e8d4f2367ed503ec760572d78852de"],["assets/images/icons/bird144.png","6235fdfde5e554abbeeb5ad1318d0693"],["assets/images/icons/bird192.png","24a3e5d18d2b28825dc07a96b514afb3"],["assets/images/icons/bird36.png","bdd6d78e9b01c087b701c6bbdb6ec20e"],["assets/images/icons/bird48.png","dd7c70059f32b3a455bde9a4fba965da"],["assets/images/icons/bird72.png","b5de33bdacffe8c407faba0570ad9fee"],["assets/images/icons/bird96.png","2f91ac01fbad575f5f751e256882b8c2"],["assets/images/img-err.png","c42d1e1d72831e9a88be8f61704de267"],["assets/images/img-loading.png","5da66a37e909242c5d51b4e2e897ca7b"],["assets/images/reward.png","816c50e5edebd643cc18864a6fb0d704"],["assets/images/wechat.png","505d41f7a3c6a583a6be2b9dc6ca5597"],["assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["assets/js/Meting.min.js","bfac0368480fd344282ec018d28f173d"],["assets/scripts/main.js","6841c187e1a5e4acc28336897fc08f9b"],["assets/scripts/main.min.js","8a8a593a329b2a5769159fdfa99fd138"],["assets/scripts/search.js","e20a0cab5d504c5012fb0c41cda9c1fe"],["assets/scripts/search.min.js","f901db6e7faecf102f487d3920540531"],["assets/styles/fonts/fontawesome/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["assets/styles/fonts/fontawesome/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["assets/styles/fonts/fontawesome/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["assets/styles/fonts/fontawesome/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["assets/styles/fonts/roboto/Roboto-Bold.eot","ecdd509cadbf1ea78b8d2e31ec52328c"],["assets/styles/fonts/roboto/Roboto-Bold.ttf","e31fcf1885e371e19f5786c2bdfeae1b"],["assets/styles/fonts/roboto/Roboto-Bold.woff","dc81817def276b4f21395f7ea5e88dcd"],["assets/styles/fonts/roboto/Roboto-Light.eot","a990f611f2305dc12965f186c2ef2690"],["assets/styles/fonts/roboto/Roboto-Light.ttf","46e48ce0628835f68a7369d0254e4283"],["assets/styles/fonts/roboto/Roboto-Light.woff","3b813c2ae0d04909a33a18d792912ee7"],["assets/styles/fonts/roboto/Roboto-Medium.eot","4d9f3f9e5195e7b074bb63ba4ce42208"],["assets/styles/fonts/roboto/Roboto-Medium.ttf","894a2ede85a483bf9bedefd4db45cdb9"],["assets/styles/fonts/roboto/Roboto-Medium.woff","fc78759e93a6cac50458610e3d9d63a0"],["assets/styles/fonts/roboto/Roboto-Regular.eot","30799efa5bf74129468ad4e257551dc3"],["assets/styles/fonts/roboto/Roboto-Regular.ttf","df7b648ce5356ea1ebce435b3459fd60"],["assets/styles/fonts/roboto/Roboto-Regular.woff","ba3dcd8903e3d0af5de7792777f8ae0d"],["assets/styles/fonts/roboto/Roboto-Thin.eot","dfe56a876d0282555d1e2458e278060f"],["assets/styles/fonts/roboto/Roboto-Thin.ttf","94998475f6aea65f558494802416c1cf"],["assets/styles/fonts/roboto/Roboto-Thin.woff","7500519de3d82e33d1587f8042e2afcb"],["assets/styles/style.css","657d260380f7135d36dab3a0cba1664f"],["books/index.html","d1f71bd75436d8599d5f7594b3e837a7"],["categories/Unity3D/index.html","c3350ac7959b8727f20dec11896aaa48"],["categories/Unity3D/pages/2/index.html","5cbafb2cca95d8feab4fa851c2264732"],["categories/index.html","b6289a52c4d127ab216bd84a6b28dd12"],["categories/人工智能/index.html","fc80a6b5fab393f4f769da24520f08cc"],["categories/单机游戏/index.html","37fcbb31ff2a9af14a2afea9e248de02"],["categories/开发工具/index.html","9fa2d3d129d37114100d5d260a5cd117"],["categories/数据分析/index.html","1533209b63e5a15c2f9093165761fc88"],["categories/数据存储/index.html","2c8e0a4961f3d1d2767ac9dab8399bc8"],["categories/游戏开发/index.html","bc24413175e4cde8efb5a869307efd23"],["categories/游戏开发/pages/2/index.html","ceae71ca378935beccab0eec5a689fc7"],["categories/游戏引擎/index.html","63c6f0070d826ed364a29bc910fa6a1f"],["categories/独立博客/index.html","c6c1f18decbd4935077b1c92a1d924a3"],["categories/生活感悟/index.html","075d5650a783bfa85caf9b929c8d3d0c"],["categories/生活感悟/pages/2/index.html","8eccf9d4acfbe10e3aa82236719a4141"],["categories/生活感悟/pages/3/index.html","a6a219bd25f09a8155d9a9fd994f44f2"],["categories/编程语言/index.html","8d13e30eef65677eee659e057daa0334"],["categories/编程语言/pages/2/index.html","3e6b1528f71389b5d367758be273a7ad"],["categories/编程语言/pages/3/index.html","101640a9355c7374525c608e299a9168"],["categories/编程语言/pages/4/index.html","0c28d8da121e59b09cedfc5232afd7f7"],["categories/读书笔记/index.html","f6b5d28ac7ebf0e300269c5c78d7d348"],["categories/读书笔记/pages/2/index.html","7112a3d635851be1bdc74eeb3645acc7"],["index.html","04615d426d7086ed80cff5b544a2d255"],["movies/index.html","dcee049041e1f08a29d20604bb069bf6"],["musics/index.html","8c778910ecad6661b31a13eb4051e2a4"],["pages/10/index.html","cd99bc88720c25ce9761ad3a1ade5f6e"],["pages/11/index.html","1df64d6b49f0b32fcee1f9db10ec02d0"],["pages/12/index.html","fe3f2b42ae4997cc64da184a2449f27f"],["pages/13/index.html","2e7dea72eaf4a4a062ee3d6ba0d8626d"],["pages/2/index.html","d25294aa1173af046ba3eab8077b00e8"],["pages/3/index.html","92894b2ba6763790c77f9698c3cc7a31"],["pages/4/index.html","0fcc51f37ad5b51a65a272fff9084d5f"],["pages/5/index.html","1899f07c94cc3e06702e30e042f23ee5"],["pages/6/index.html","bf0fd959569f00d557c2495820d8a11a"],["pages/7/index.html","de42e3c745056b4c2b50cff88e6b901b"],["pages/8/index.html","0f5c292cebcc96a96ac92f346442b469"],["pages/9/index.html","63d55f54d7f2ff6fa0c7a7f7199035ee"],["posts/1059499448/index.html","36cb791d5cfbdb20f885a06456d11a10"],["posts/1082185388/index.html","a9f876d220b38ca32150261551323f31"],["posts/1099762326/index.html","a69800f92bdd7ddbf44b3c09f2a1a3b9"],["posts/1113828794/index.html","e92c0d74709cf6ad8c433f97d66e32d6"],["posts/1118169753/index.html","5f007005cefc5f77b045f6e3dd8788d8"],["posts/1124152964/index.html","026344d5f5e19d5e095cd927afa495df"],["posts/1127467740/index.html","d300b856e361f8addaee26f3d963d522"],["posts/1150071886/index.html","fa446411c17c18695f6977e7221c0558"],["posts/1150143610/index.html","72e08d8884cb040babb8214bed1c2815"],["posts/1152813120/index.html","96dc08c93b4f16e34f09a2aca1f03bf5"],["posts/115524443/index.html","a4b70809c791018feed35e225d21e7a2"],["posts/1156673678/index.html","524df711ef2e028ced5d7d63148b1998"],["posts/1166840790/index.html","e882b688e1e65dcff0ef9c1e2bce6fe8"],["posts/1176959868/index.html","480298750db291ab19a9d33096c05037"],["posts/1190622881/index.html","7a075af4c4aa78522b723edf6287ebb5"],["posts/123663202/index.html","6a1f97d2b4368d5b70b155b16af2e149"],["posts/124807650/index.html","723393926901f08cf130dc9e84f161d6"],["posts/1254783039/index.html","055c125f8ccd74f0297f7a1b672aba75"],["posts/1320325685/index.html","a454530ba72ea9d053b64a90b7ebd2fd"],["posts/1329254441/index.html","af1ba951b99de76b525d26e6aaf218aa"],["posts/1357715684/index.html","566d578a5c47718ab545adf1529addd0"],["posts/1358971951/index.html","03e96f45ca2bdd9f6b78f32b51483567"],["posts/1386017461/index.html","b5b25e3db81d8b57a34516b3dc637375"],["posts/1394521917/index.html","97dd4a12f33adcfa0a7203b43c0d95b3"],["posts/1424645834/index.html","82ffad57aad54091f16656228133b516"],["posts/1444577573/index.html","e781d62f2f81ec2c7d9e4930ecf03566"],["posts/1467630055/index.html","d3792ec6ab8cf38d5eab52baae5f113c"],["posts/1478979553/index.html","a3de4152b0eaca351c998455fa99f840"],["posts/166983157/index.html","c4fb4919cec9a01119e749b46c023fcd"],["posts/1670305415/index.html","0947dace6dcd98e24191070563a31eb6"],["posts/1684318907/index.html","7cf5c613eb787def6645f6a093375e92"],["posts/1700650235/index.html","09d41478285773e0d403c5a32fcc6295"],["posts/172426938/index.html","46a8067bacdb0226eef3e962bd95d840"],["posts/1836680899/index.html","aeeccb927de62aaf22842fdb1f7adc1a"],["posts/183718218/index.html","49897566aec793ab9b86adeec93ee80e"],["posts/187480982/index.html","503d5875e0dd126a09c4c509ac3bf416"],["posts/1930050594/index.html","acbdfbcfd42389c68239377e58a5b95d"],["posts/1933583281/index.html","59e6a6926c3b23ea73a57e3af0548e9f"],["posts/1940333895/index.html","a7bfde3c16c2550e07b144d561d44ea8"],["posts/1983298072/index.html","8843801dcdb68ae96f385b4e8bb3b9be"],["posts/1989654282/index.html","52430e41f9c8141ebb725d477d36dbb6"],["posts/2038378679/index.html","6f5a54984e83c5bb81448a11fb4911c2"],["posts/2041685704/index.html","244fff62ac2c3cfdaa6cee5dc6a25cd7"],["posts/21112647/index.html","4ea57f0a56bd8d32b412bdbc73970d0e"],["posts/2158696176/index.html","b49dc581c65f9dd011b322c534f1fe1c"],["posts/2171683728/index.html","9b8ed159079065cbbf2cefae72a56337"],["posts/2186770732/index.html","7c8f9bf33361481546e593cc01193f2c"],["posts/2275646954/index.html","e8a16cc6f01aba0a72484d9558766293"],["posts/2314414875/index.html","883451e1db708d1545da909617822af8"],["posts/2418566449/index.html","9a7eea51d4013c8626973387227858e3"],["posts/2462008667/index.html","b895c1c726ac622618905630fa6d292c"],["posts/2463121881/index.html","23eccc053d5dd765c88c0ef985826401"],["posts/2527231326/index.html","164a921a847fa6f192d1bd7b04a5b6ae"],["posts/2583252123/index.html","37d9036ad630d6f8aa26496dd76a3a1c"],["posts/2613006280/index.html","7ad9c0470533a3b98d823b6bf7353d7c"],["posts/2617501472/index.html","ff5c149ee6c17d09efbb1358e0578826"],["posts/2676125676/index.html","863a96b4932600b714a62155485d10a4"],["posts/2734896333/index.html","37fdd6b75134ca76d15851049bc34068"],["posts/2752169106/index.html","b805d80b75eb4c97eb41250fe8174db7"],["posts/2799263488/index.html","8b8ca4415f19068aeed4a6feb018ac8b"],["posts/2805694118/index.html","6a4ad0df97def98f4a278870da866e5b"],["posts/2809571715/index.html","22b70da70fa84a2aa0a46849068ea11f"],["posts/2822230423/index.html","9dc77b819c0b1b99e1b7597054b8bfa9"],["posts/2829333122/index.html","da79deffa015f3182f1efea21b57254b"],["posts/2911923212/index.html","477b6ec4ca1be601224adc419679642f"],["posts/2941880815/index.html","cdb9c8edafbcc280eef16e9a84a3444c"],["posts/2950334112/index.html","ee40097b61c8bcb0bfb2a5e5c50d5d56"],["posts/3019914405/index.html","0467cf2212285c0fd4e5d539d9644dcb"],["posts/3032366281/index.html","c049df76ef87d3a9d77a36e6f52e3db4"],["posts/3040357134/index.html","b8132084a0a220e6826e5ddf9f7f3f3a"],["posts/305484621/index.html","0c5f1a0aa9aff16166037a251c56cbf3"],["posts/3083474169/index.html","dbd95c3dc80bf1e5001c7a9437663855"],["posts/3111375079/index.html","04e25e59f00502baa495fffaa4602751"],["posts/3120185261/index.html","6c5ca2666e76dd99c3896d40d4fea942"],["posts/316230277/index.html","9f60e597df0cc79f6614595fb31d6b30"],["posts/3222622531/index.html","f9a43b6461e94df2d4f12cde1f29f30e"],["posts/3247186509/index.html","b2c82db92b7779b58ef5478d9266121f"],["posts/3269605707/index.html","a61668573cef5550352cf797450fcd91"],["posts/3291578070/index.html","6c4c0fa40906ef705526e717e6c35247"],["posts/331752533/index.html","81c2545637a3cb28b73708643f885c02"],["posts/3321992673/index.html","17b6d427495d5c914a7e5e15096f2ad9"],["posts/335366821/index.html","81300e060668ab794c09bce40f3b9059"],["posts/3356910090/index.html","b1bc374137a6a23afdbd9bca67a7480e"],["posts/3417652955/index.html","5aa2e6261cfa1b8a160c46c648bf9bb7"],["posts/3449402269/index.html","523ebb6936d0a64edb50c9f36676b531"],["posts/345410188/index.html","0ca69405152bbd9de21dfcb380e44564"],["posts/3461518355/index.html","93a12715de5e9751f9b9cc936c588f97"],["posts/352037321/index.html","d59062c2d694f0959b79457b0bc927b8"],["posts/3521618732/index.html","e092b3bf4f45cf37dc39333c8a74243d"],["posts/3568552646/index.html","57ef9b274337f8b7cee252f5b47808c9"],["posts/3603924376/index.html","2d81a042d9bed12de641d7791ac53729"],["posts/3637847962/index.html","cd741ab7828dd7877238c94890a1a42c"],["posts/3642630198/index.html","98394a81ff421a9fb51844143ecd35dc"],["posts/3653662258/index.html","543eb06e08070e1fe1123278594eb65a"],["posts/3653716295/index.html","e9de9355b7099948d481cae67909cf09"],["posts/3657008967/index.html","22b7ab1dfa4d4266cff3532b517769c9"],["posts/3668933172/index.html","df84220d01a0a17250a087624b61da24"],["posts/3695777215/index.html","bd7e3296ad61039444b629b28e2d37c1"],["posts/3736599391/index.html","56812b34afa6be32446a76d233f7ff5a"],["posts/3782208845/index.html","95b56d70aa37ab502e63a4514b3b5052"],["posts/3789971938/index.html","fe56a036d7f692d554d31103e1b8a6fe"],["posts/380519286/index.html","5bc9b176bb7cf877157a007f2d63e6c4"],["posts/3873710624/index.html","050beb397f3bd59ee50bd86b04464c9f"],["posts/3959327595/index.html","f095ba8a2fa77f9a9dbc405950016688"],["posts/3995512051/index.html","80748e742d195207a50c3302e0291225"],["posts/4088452183/index.html","bed3015bb326e6c1617481d94f651c80"],["posts/4158690468/index.html","8f47609c368f76801b516b5df5a94ac1"],["posts/4197961431/index.html","c3b5fa02d1fa4dc7c464b2a9c7e36646"],["posts/4205536912/index.html","702ae9f284119c132ab8cb176a523f8f"],["posts/426338252/index.html","3993cf363a8ac0fd884c73dca6a557aa"],["posts/450254281/index.html","002a4be9ab5e02745b75b90c642358fe"],["posts/4891372/index.html","34c44a404fb9bce341536d24f8567682"],["posts/569337285/index.html","69f3d0a2d1a51b12ccec1c9cb39fbdee"],["posts/570137885/index.html","45647d08326634209cef68e9aa495e0e"],["posts/570888918/index.html","e432e59c9c74dd16512861255957fcf1"],["posts/582264328/index.html","645cd350a92c776102a5818d149a55c5"],["posts/632291273/index.html","8405fbf2dd4b8f9591c552f725915b05"],["posts/70687890/index.html","90731c32a82c73c3d6b5c1537c9c2c86"],["posts/719322223/index.html","2c18dd7b02ddab7504ad23ba7fd95908"],["posts/720539850/index.html","91dabe1903d7bbe402d0c4d99962a30e"],["posts/786195243/index.html","4eb5733dc253b9e483a2bbd7ebb983b5"],["posts/795474045/index.html","3380c35dedae92469008f90dd12e3a31"],["posts/815861661/index.html","65c16c2713378d6351a251d4f764f152"],["posts/821259985/index.html","0609152d691027ca8c0e18f4274b9cc5"],["posts/828223375/index.html","ffee602a7bef1c0c887b16ca420bafbd"],["posts/887585917/index.html","26001ec63f355e9543c09086db08d9f7"],["posts/906436376/index.html","946f5f0ea74bcf7c3f2b40ba75c3e2ca"],["posts/907824546/index.html","c654c8f46885f95c484f065617ce2fb6"],["posts/927393529/index.html","fcab2d0eae5f162432e876b39616dcc0"],["posts/94443781/index.html","6d41dbcd5a135df919e1130ffeed6d49"],["tags/2014/index.html","9a7babf21734e6997dfb2923db36563d"],["tags/AI/index.html","291be3752d3ad02b3b0476373ee90f35"],["tags/AOP/index.html","dd97bd736988aae04e48980bd4bad6ad"],["tags/AR/index.html","7829fa434e5be3476e96e597dace3530"],["tags/AssetBundle/index.html","c84de6d76bae22c3148ecf886b109b63"],["tags/C/index.html","bf997be4ab8b97f48db1c268f56f1cb1"],["tags/CG/index.html","f39d7d68bddae9c90c38de3f540db273"],["tags/CI/index.html","c6e2b4ec3c3f57753f8c573e524998a1"],["tags/CSharp/index.html","fbad72fc72542d72b2377de8e294d4da"],["tags/Docker/index.html","0da9014c72161787eda7127339385b31"],["tags/EF/index.html","0fa5913c65976aa7edac255a0343709b"],["tags/ES6/index.html","82a287bfef40ade3234fb30cd689c553"],["tags/EasyAR/index.html","75e4d595dec5a0dd8645ad6b925f99b1"],["tags/Excel/index.html","459206472e089102e0cd0fe912dd61cb"],["tags/FP/index.html","f8a59c2b8eaa92bcd5c044d6d9070a5d"],["tags/Form/index.html","e80fd849d6570053b56e827a3679438f"],["tags/Git/index.html","8e9f340eab3fa82a708b920e7435f177"],["tags/Github/index.html","2783e3769251da92556a4868dcc49d47"],["tags/HTML5/index.html","c057e9d87c06f9547c7090e6d6359ebc"],["tags/HTTP/index.html","0b00ae39ca32759e4da860e7126b5b31"],["tags/Hexo/index.html","51c6fc883c56290a4d0061840249d465"],["tags/HttpClient/index.html","f8a78104b77cedb82d49e2019a2c5a3d"],["tags/IDE/index.html","2a1c0bff1c4e4ceba9e3715d0e6affb8"],["tags/JS/index.html","d125cb5b4fc2e4662b08e9f8a2a9e4c3"],["tags/JSON/index.html","66dde83c85342810b36b8210af50de87"],["tags/Jexus/index.html","10e26ee8e1bee88d35fc497e165e004a"],["tags/Kindle/index.html","cd745ef24e0ec890ac8f48db8d7a1a43"],["tags/Lambda/index.html","c0b9fd986d7ef4b387566afbd2d521a8"],["tags/Linux/index.html","0b614f665f1bf5df064a2552103f2e3f"],["tags/Logger/index.html","95dbd44356eb2e59712deeccf42fdd97"],["tags/Love2D/index.html","833680af6c48675289152da133e75038"],["tags/Lua/index.html","3e30cb1555123e1959c815b26480c5e2"],["tags/MMD/index.html","8bbee78fce48b72ffc2f2d26133b8ebe"],["tags/MSBuild/index.html","406678a3fbea23263b2b4e16da7a2c6c"],["tags/MVVM/index.html","ee4dfce466b6fb3142c7027461e47331"],["tags/MapReduce/index.html","fcdf71255140b8cf67dd5508829314ab"],["tags/Markdown/index.html","ba77427c50312246486295b68f422531"],["tags/Mecanim/index.html","bbbeb1dc3a7f49cf27df61124c6e2ea4"],["tags/Mono/index.html","f6585689f3f5f068adda3ac1f06b4711"],["tags/NET-Core/index.html","2f4889d45bcd4391fcb1371f4192d44c"],["tags/NET/index.html","9d10cf920d1723a52068a9e636697629"],["tags/OBJ/index.html","c011156a3408145da26cff80a700bdae"],["tags/PWA/index.html","227285e230585e7da598df237fbf037a"],["tags/Python/index.html","6c828a9bd7de53defee3a31411a1f601"],["tags/RESTful/index.html","777e494c554b8fbb9345854135c56243"],["tags/RFC/index.html","205a8b55b286dffa8b17e8ea474bbaaf"],["tags/RPG/index.html","567b6bfa0aeeb76eddf77a7affd6b053"],["tags/React/index.html","c0a3b5f40078c7f4bd763f6a46cba380"],["tags/Redis/index.html","25c97a1632427e87d3422f5d5adb858b"],["tags/SDL/index.html","e2043f29aa81e987ac2c721ecec13105"],["tags/SQLite/index.html","2427c6ece2757528c32df0d56a4573c7"],["tags/SVN/index.html","1a5bd99303ea1a7a596135b15f15d21e"],["tags/Script/index.html","bf7c6671c4178d4e59d3b5e0b437aaea"],["tags/Shader/index.html","704a255edf7edf53d7e62a1674b88c7c"],["tags/Socket/index.html","f378b822eb6fac621b91e46ee3729aab"],["tags/Sonar/index.html","e1ff029516e5950563d3166e73488e45"],["tags/SourceTree/index.html","b5b87112b31e44cf47b4a516f8dc494b"],["tags/Sublime/index.html","2cc444f0ac4f6fefd9c7d35b85dc8cc4"],["tags/Trace/index.html","c05326f8ee065ea70eb1e5344408a811"],["tags/Travis/index.html","dc7c5f9996cce020b6401c290fd11462"],["tags/Unity/index.html","38beccc32987cec1e2083750118e69b0"],["tags/Unity3D/index.html","21be01b849141fc730ed5a0ba45d57a9"],["tags/Unity3D/pages/2/index.html","3923e5aee4ac44f498abe5acbd5225ad"],["tags/Unity3D/pages/3/index.html","5fa3952d8543fa8ea0532b333d72d348"],["tags/VSCode/index.html","a79f815342b86eae29c255e3deff31b9"],["tags/Visual-Studio/index.html","374c9bcada7d7e0bdf6b2a8562b99b48"],["tags/Vue/index.html","9662856a49d0f2c8f873836d13965bf0"],["tags/Web/index.html","b4e975423adea8222dca18fbb7601869"],["tags/WebApi/index.html","98502c6315dfbcfdd51da53be7649ce0"],["tags/WebSocket/index.html","423ccdd199cd4d7be092a3789e20915e"],["tags/Wechat/index.html","4dbd6e79b4f9a95bbc9b29485a9efbfc"],["tags/Windows/index.html","d976290ae3b3b5d363d43986cf047266"],["tags/disunity/index.html","dacf47269bd460b30485754cefee23b6"],["tags/index.html","f4773d32f7dbcfaaf2ecf49cb76c0b4e"],["tags/matplotlib/index.html","0a77be4be3d0f02a3c3b09221fc45e6c"],["tags/uGUI/index.html","a6fab187c39dcb651f6c62a59dec5bfd"],["tags/一出好戏/index.html","8babc1238986a763c6cc88f61b1f648a"],["tags/主从复制/index.html","25c7607f391cf63deebbb2f637ccc743"],["tags/事件/index.html","d0079a95f8361fc7176513cf8375fc2c"],["tags/二维码/index.html","4c4aba4edfceb92c0eef715290b4a790"],["tags/云音乐/index.html","4fe73586b971c1d9ae701d985b2bb9f9"],["tags/互联网/index.html","5d1e80eaeb906e784c3b33e489128627"],["tags/亲情/index.html","10222855d3bad81a26583a1dfcc51eb9"],["tags/人文/index.html","278485df291d1b35e2e2a19c366a79e6"],["tags/人生/index.html","6bbe0332a54aec3744dc537851c2669d"],["tags/仙剑奇侠传/index.html","8b091bbeaf517dc580a51b0d2986c48a"],["tags/价值/index.html","d4279f7c4542d794dd9f0605abf8fe1c"],["tags/优化/index.html","2aa1ae7e33588749486bfc271d5294c8"],["tags/全智贤/index.html","a64f6e5837abee08a2eeb6cbaf04c1ff"],["tags/公众号/index.html","6ae09bcae6f6263ca09e237cbe2f2aa6"],["tags/关卡系统/index.html","a3d7435377f6cae64baa523dbf60ec10"],["tags/函数式编程/index.html","18b3e30043ed0cb4d3663df0bdb10c80"],["tags/别离/index.html","5799cc78504416ef1fed7232c3afa2f9"],["tags/前任/index.html","3ecfefab1a84eaae2972734819efb93f"],["tags/前端/index.html","f468a9c21fb5fcfbccc2d1978711df29"],["tags/剑指Offer/index.html","3eb9b9d1ccd546f3d5b9ce98a473ec3d"],["tags/加密/index.html","fbc093f27ca3e15bb7d763565bfbefeb"],["tags/动态加载/index.html","d9e0ec4070abdaf898ae4051538e008d"],["tags/动画/index.html","cdf38710344e85b06baad5b8c05983be"],["tags/单机游戏/index.html","4f3dfcfc26242cfaaf180b7d6613bfb1"],["tags/印度/index.html","50d3ce53df94e9cf30e912a7d37dcbb7"],["tags/反编译/index.html","9e37e4779fe20643052046768d1da780"],["tags/同步/index.html","ffbab35717be0a322576d4c425635e36"],["tags/命令/index.html","226dbb2f20bf56d20efaf314d105299f"],["tags/和平/index.html","458e175cda629e5dbbea699807d2af5c"],["tags/响应式/index.html","27bd4793b2a68c429325eeb92a5b9264"],["tags/哲学/index.html","c882e3bfb428d0c68b0660b707582af4"],["tags/回家/index.html","8584edf4f9ade7029f32cabae3c222ef"],["tags/回忆/index.html","0b460731f400167b560257b4645c9681"],["tags/回首/index.html","fc30145982b9c3dda21b409244a1de35"],["tags/图形/index.html","b47224cbda042e73751909e9386c79fc"],["tags/塔防/index.html","9eec6af64600ef5d3b15cef835faad5c"],["tags/增强现实/index.html","0b78b8e5226664005b88bf2f3bb9f250"],["tags/夏目漱石/index.html","9e191832732105762e0156f620120c31"],["tags/多线程/index.html","ae9c00dd4623801063c402d1ccd35863"],["tags/大护法/index.html","c1732fb6fc395ad0350b83cf1b6ccfc9"],["tags/委托/index.html","9443a2a4e740fc32f2579d93073c7209"],["tags/孤独/index.html","163da029c7bacd89f4f0a700f4742e71"],["tags/展望/index.html","8792e096c69a340b74afec3627976686"],["tags/工作/index.html","80e9a3433ec347623eef40629da9df62"],["tags/平凡/index.html","04b79ffe17aa63f89ff25f2893b4d881"],["tags/年华/index.html","55c6021bc37125e65f73795f4e1544df"],["tags/开源/index.html","b342a5b70abd9d7224f6e663c5d04331"],["tags/异常/index.html","09590195b2a550171d9fa4c10a4aac78"],["tags/异步/index.html","66905c6f6a3c505a527c103e06b3234a"],["tags/引擎/index.html","6fd467f99a106679816e7cd60247589d"],["tags/影评/index.html","29893d03dbd9192390ce82ffd245ce6b"],["tags/微信/index.html","20485b11586e0404e8c94b3d21631f63"],["tags/微博/index.html","ac504c3e4a93c7e7640f8c15ce4b1f65"],["tags/心情/index.html","878b3f789c24dc7f138764a6442a5a75"],["tags/思维/index.html","ae6154dfeb7a31d4e6725203f50a8066"],["tags/总结/index.html","2339a6e4471193780c0e3f54d5ad87a0"],["tags/想法/index.html","dd3af6322413b90a72e8fadf7fb84297"],["tags/感悟/index.html","9b28c53ad6a25a1da0218a659f06a851"],["tags/成长/index.html","ab033f2d1e9f6d2498a569b63766e0bf"],["tags/我是猫/index.html","9fb4b94a26975f6f8c480b6a03f0600e"],["tags/扩展/index.html","c2ac2ff702f7a89c37c62807155a7979"],["tags/扩展方法/index.html","86991dad6a42327387afbedcdf8a71cc"],["tags/技术/index.html","53dd982c2ee1378add0ba206384065fd"],["tags/插件/index.html","ab658854b4ec3d154437fe30661a5164"],["tags/数字/index.html","8f990f0c4d561c64e2d3b22ef91794bd"],["tags/数学/index.html","c47a49870e5d253ef5550ac00c7a9e3e"],["tags/数据/index.html","2441521583fa2fbb6cf97d9150a3e25f"],["tags/数据库/index.html","137f09c14948fd2adbdd208a669c12f6"],["tags/文本分类/index.html","7929d81e1b8bcc4dc50c43a384c7b260"],["tags/无问西东/index.html","7b90d89a6492a6d35de72f2f56ee3c74"],["tags/日剧/index.html","de1ed83d34e5872e7e502dc6890c60b5"],["tags/日志/index.html","d8b6c89b098a3259419d8dc5eabf25cb"],["tags/日本文学/index.html","0a42d455b71270cd97b783146affcb5f"],["tags/时区/index.html","f1f1a53c40e56bd4c68b44aa5a54829b"],["tags/时间/index.html","a79ec26ed37cc3c0d235dafbc41ae9d5"],["tags/服务器/index.html","51ec724880661663a858ccf3ea39bc9b"],["tags/朝圣/index.html","bc57dcf9054443cc97378029adcccded"],["tags/朴素贝叶斯/index.html","9779ca87a0bb1d04eda1ae217b2ac038"],["tags/架构/index.html","51c15e8fe42f750badabb676ccc6f161"],["tags/校验/index.html","9d84e7ff852966a622c590feb9d566b6"],["tags/格式/index.html","cb45b3870d4adeee832ab1789e6fe413"],["tags/格式化/index.html","f740fdf1e71cddc263bd8aaff09e2771"],["tags/梦想/index.html","87c9556d04618a0bbc91abaf21aa25c9"],["tags/概率/index.html","9b9ae1e7dd0595b9c81687c30833cdd6"],["tags/模板/index.html","1b2bd620078ca56eee7fa94576258fcf"],["tags/毕业/index.html","8c84255eadef3887ac6ef680c5b06742"],["tags/毕业季/index.html","31cd5c011ef576a450618a153aa330fb"],["tags/消息/index.html","706855bb61b91a456e3be9460403972f"],["tags/游戏/index.html","1ecf170b27c5ef55f8faadb9cdc11172"],["tags/游戏/pages/2/index.html","5a9941a593f9c4d33fd8fc4f9f6b51fc"],["tags/游戏开发/index.html","07dc78fdcc1a442a80fce642f1732cef"],["tags/游戏引擎/index.html","9c62096e43a1e794895fc3f34579d26a"],["tags/爱情/index.html","79b973a4ee73c463017fdd8276dd93c1"],["tags/版本控制/index.html","39de73b07e670bae8e9c920bfef7813b"],["tags/版权/index.html","96c6039594047ac54aa4fe06d11a1315"],["tags/特性/index.html","9e0b080fcc34effadbb5c4abb1eb8256"],["tags/状态/index.html","eedc7747148774c77409dfa6341d8aaa"],["tags/现实/index.html","66c024e7d8379c1256493ee04fa16f3b"],["tags/生活/index.html","0dc44d138a0e998558bc3fa9174c7817"],["tags/电影/index.html","a79cd8d93d7739d3465f0654aa2c81a0"],["tags/画家/index.html","6bd7c6bc9dab41de1ca8b569a4d70e09"],["tags/知识共享/index.html","aee9b752ff430dfebc70949b0d52c317"],["tags/矫情/index.html","a5b2f2eeec292fecfb034facb18249ab"],["tags/程序员/index.html","0ffd188c8a2a1715adf1a48799a1229d"],["tags/穹之扉/index.html","6e3c0087eb4bd8e3540aa63a2735e4c1"],["tags/穿搭/index.html","09ebfd91794c0ea356eb4eab2b78e0ff"],["tags/童话/index.html","0c4bf264cd5b2b08fc91cf23fe29eda1"],["tags/笔记/index.html","c7ad9d8f5e8c60625d4e43d63996991d"],["tags/算法/index.html","9a5e6b0674b114a54254efeff37e74d0"],["tags/米花之味/index.html","69c9094a0e57a7b8a51c2e420f54cf63"],["tags/缓存/index.html","ea29dc9914d89b5e55d4215fa8eff3d6"],["tags/编程/index.html","fba4109620312bbea25104b5f6c8324a"],["tags/编译/index.html","c2acfcbe40a6b2e04841578ddab58092"],["tags/编辑器/index.html","410e2006ff9881c110f5d3a131084a07"],["tags/网易/index.html","53aa67c39938a239927c88858064c6aa"],["tags/脚本/index.html","2869b05c260168f4c6832b9bb022532e"],["tags/脚本语言/index.html","455858514160f7bfd66542ed1e793001"],["tags/虚拟摇杆/index.html","c52174d13daa1cfcd06442a35b670a7f"],["tags/蛋炒饭/index.html","994ae82d0736d70904008476bfff347b"],["tags/装饰器/index.html","f948c07fd0383d0b8f3cde55deadaacf"],["tags/西安/index.html","ccb1b17beef550e298e272e4e4e0407d"],["tags/计算机图形/index.html","2ed8242aaba3294ca95dcdd2add8bd0e"],["tags/设计/index.html","1df1893fff4fa77067c4a4e267c6a4d0"],["tags/设计模式/index.html","bfe28d0f704ff041f06bd055d45dcfb1"],["tags/词云/index.html","099b117591b025ebd27def49c72ef5b0"],["tags/诗人/index.html","d359c8de66a08c9f109c66924a1f86d5"],["tags/语法/index.html","430c04c6f1c74c72def881385bcea722"],["tags/请记住我/index.html","d9042d52241fb6d7b3c893581c45692f"],["tags/读书/index.html","a3235426ccfd312ffd898d19976dcd9a"],["tags/读写分离/index.html","ba2d8143213704711904ed23abe39912"],["tags/调试/index.html","024c2e775d470a5bee32649d634b957f"],["tags/贝塞尔曲线/index.html","3eb25de5e3c04ff1f959ef4f72ba16fa"],["tags/贪吃蛇/index.html","9731ef804c192f46ea58fbdde2dbe08c"],["tags/资源提取/index.html","cad10fbd1a39f777a3730a2e3f74dff3"],["tags/跨平台/index.html","0eac24afc5948a751df11f9f6b88e61b"],["tags/转盘/index.html","7e99cf7b251a6d578c45b5b6f1f1113e"],["tags/通信/index.html","01bb73c2468f89c6fbcb1f0bd4c2fd69"],["tags/邪不压正/index.html","9f44e1da818f7862573d74b1c650968e"],["tags/部署/index.html","fc339523e8ef4fd64a82328dac63c9a4"],["tags/重试/index.html","d6eac86380cb1816b4dcc98a25860cb0"],["tags/阅读/index.html","0996fc795b6255edfe169dc23eaecdd2"],["tags/霍金/index.html","2da4f40c74196650d8e8fc866629855d"],["tags/青春/index.html","92b1da7d09e56213058e86f31cdfc5de"],["tags/面试/index.html","704ace9c677996fed869f920306b6a8f"],["tags/韩寒/index.html","e3c36d8bb1a23cb5b250e14e77abba23"],["tags/马尔克斯/index.html","71db97ab9f97e0b72c555029941a2fe8"],["tags/黑客/index.html","4aca994f240179894cad212a3c9f95ad"],["wiki/index.html","ac7744a2b46c080b12a70ac41cef4c63"],["works/index.html","f980860f3a54757b09d11bd2688e47b9"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







