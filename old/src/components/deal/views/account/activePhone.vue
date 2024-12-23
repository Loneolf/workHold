<template>
  <div class="explain content native-scroll">
    <div class="input_form login_form mt10"  v-show="!xy">
      <div class="input_text">
        <i class="icon icon_phone"></i><input type="tel" class="t1" placeholder="请输入手机号" id="phoneNum" custom_keybord="0" maxlength="11" v-model="mobilecode">
      </div>
      <div class="input_text">
        <i class="icon icon_code"></i><input type="tel" class="t1" placeholder="请输入验证码" id="ticket" custom_keybord="0" onkeyup="value=value.replace(/[\W]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"  v-model="CheckCode" maxlength="4"><img id="randomImg" class="code_pic" border="0" title="看不清楚换一张" v-bind:src="randomImg" @click="getRandomImg">
      </div>
      <div>
        <div class="input_text" style="width: 55%;float:left; display: inline-block">
          <i class="icon icon_code"></i><input type="tel" class="t1" placeholder="请输入手机验证码" id="phoneMsg" maxlength="6" custom_keybord="0" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="CHECKKEY">
        </div>
        <a id="sendMsg" href="javascript:void(0);" class="activeBtn {{prohibit}}" @click="sendMsg">{{sendText}}</a>
      </div>
      <dl class="notice">
        <dt style="padding-top:1.5rem">点击"下一步"，表示已阅读并同意<span style="color:#0a8ddf" @click="changeAgree">《互联网账户协议》</span></dt>
      </dl>
      <div class="ce_btn" style="margin-top:10px">
        <a href="javascript:void(0);" id="next" @click="nextFunc">下一步</a>
      </div>
    </div>
    <div class="show_warp" v-show="xy">
      <div class="box">
            <div class="explain content native-scroll">
                <p class="confirmtitle confirmtext">互联网账户协议</p>
                <p class="confirmtext">“中信证券客户终端”（包括但不限于信e投手机APP、中信证券微信服务号、中信证券官网、中信证券至信全能版网上交易系统等）是中信证券股份有限公司（以下简称《中信证券》）基于客户的个性化需求，向客户提供包括但不限于行情展示、投资交易、市场资讯、基金理财等服务的平台，归中信证券所有和管理。用户在注册中信证券客户终端过程中点击”确认”协议即表示自愿申请使用中信证券客户终端各项服务、完全同意并接受本协议条款。用户在使用中信证券客户终端提供的各项服务前应仔细阅读并理解本协议，用户使用中信证券客户终端任何服务或功能将被认为您接受以下协议条款：</p>
                <p class="confirmtext noIndent confirmsmtitle">第一条用户言论合法性</p>
                <p class="confirmtext noIndent">用户在使用“中信证券客户终端”进行言论发表时不得违反相关法律法规规章、监管规定，不得在中信证券客户终端发布、传播或以其它方式传送含有下列内容之一的信息：</p>
                <p class="confirmtext noIndent">1．反对宪法所确定的基本原则的；</p>
                <p class="confirmtext noIndent">2．危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
                <p class="confirmtext noIndent">3、损害国家荣誉和利益的；</p>
                <p class="confirmtext noIndent">4．煽动民族仇恨、民族歧视、破坏民族团结的；</p>
                <p class="confirmtext noIndent">5．破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                <p class="confirmtext noIndent">6．散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                <p class="confirmtext noIndent">7．散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
                <p class="confirmtext noIndent">8．侮辱或者诽谤他人，侵害他人合法权利的；</p>
                <p class="confirmtext noIndent">9．煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</p>
                <p class="confirmtext noIndent">10．以非法民间组织名义活动的；</p>
                <p class="confirmtext noIndent">11．含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；</p>
                <p class="confirmtext noIndent">12．含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的。</p>
                <p class="confirmtext noIndent">13．发布带有任何有联系方式的网络创业、网络兼职、刷Q币以及非真实性中奖信息；</p>
                <p class="confirmtext noIndent">14．内容包含带有任何联系方式的学历职称代办，专业代做试题，作业，论文等题目以及售卖考试答案等信息；</p>
                <p class="confirmtext noIndent">15．发布任何带有联系方式的银行卡代办、买卖发票、非法彩票等信息；</p>
                <p class="confirmtext noIndent">16．含有联系方式的黑客、收费删帖、办证刻章等违法信息；</p>
                <p class="confirmtext noIndent">17．非官方认证的发布任何带有联系方式的医院、美容、药品、祛斑、医生专家和整容等信息。</p>

                <p class="confirmtext noIndent confirmsmtitle">第二条中信证券客户终端管理</p>
                <p class="confirmtext noIndent">1、中信证券根据实际情况通过中信证券客户终端向用户提供互动服务，服务内容包括但不限于行情展示、投资交易、市场资讯、基金理财等。但中信证券有权对相关服务内容进行调整，并保留就相关服务收取费用的权利。如中信证券决定将相关服务项目调整为收费项目，将提前5个交易日在中信证券客户终端上进行公告。如用户拒绝支付费用或资金余额不足支付费用的，中信证券有权终止为其提供服务。</p>

                <p class="confirmtext noIndent">2、用户登录使用中信证券客户终端，即视为理解并同意：中信证券客户终端有权随时变更、中断甚至终止部分或全部在线服务，不需对用户或任何第三方负责。为保证中信证券客户终端正常运行，中信证券定期或不定期对中信证券客户终端相关设备进行维护、检修而造成平台服务中断，中信证券将尽力避免服务中断或减少中断时间，但中信证券不对平台服务中断承担任何责任。</p>
                <p class="confirmtext noIndent">3、注册信息和隐私保护</p>
                <p class="confirmtext">（1）用户在中信证券客户终端注册并使用相关服务时须提供真实准确的个人资料，并在相关资料发生变化后及时更新。用户须妥善保管中信证券客户终端注册的账户、密码，防止被他人窃取。用户在注册时预留的联系方式（包括但不限于手机号、邮箱）可能将作为用户忘记平台账号或密码时取回相关信息的有效途径，请用户务必保证相关信息真实准确，并妥善保管。</p>
                <p class="confirmtext">（2）用户不应将其账号、密码转让或出借予他人使用。如用户发现中信证券客户终端账号遭他人非法使用或存在被窃取可能的，应立即通知中信证券。因第三方非法窃取或用户疏于保管导致账号密码为他人非法使用的，由用户自行承担相关责任。</p>
                <p class="confirmtext">（3)用户因密码遗失或密码被盗向公司查询密码时，必须提供完整、准确的注册信息，否则公司有权本着为客户保密的原则不予告知。</p>
                <p class="confirmtext">〔4）用户的用户名和密码只能供本人使用．不得以任何形式转让或者授予他人使用，如有发现同一账号和密码在同一时间内被多人同时登陆使用，公司有权取消此账号的用户资格，并不予任何赔偿或者退换任何已缴纳的服务费用。</p>
                <p class="confirmtext noIndent">用户在使用“中信证券客户终端”进行言论发表时不得违反相关法律法规规章、监管规定，不得在中信证券客户终端发布、传播或以其它方式传送含有下列内容之一的信息：</p>
                <p class="confirmtext noIndent">本公司建议：当您的各项状况发生重大变化时，需对您所投资的金融产品及时进行重新审视，以确保您的投资决定与您可承受的投资风险程度等实际情况一致。</p>
                <p class="confirmtext noIndent">本公司提示您：对于您在本问卷中所提供的一切信息，仅用于中信证券及中信证券（山东）、金通证券、中信期货等下属的全资或控股的证券公司、期货公司及其子公司适当性管理及相关业务，您在中信证券及上述子公司的风险承受能力评估结果将保持一致。本公司在此承诺：将严格按照法律法规要求承担保密义务。除法律法规规定的有权机关依法定程序进行查询以外，本公司保证不会将涉及您的任何信息提供、泄露给任何其他第三方，或者将相关信息用于违法、不当用途。</p>
                <p class="confirmtext">1）事先获得用户授权；</p>
                <p class="confirmtext">2）根据法律法规规定或有权机关要求；</p>
                <p class="confirmtext">3）根据中信证券相关审计、法律顾问等中介机构要求。</p>
                <p class="confirmtext noIndent">（6）用户如果将资金账号与互联网账号绑定，则可以通过互联网账号直接查看资金账号的资产情况，而无需再输入资金账号密码。一旦手机丢失或被他人查看，则可被他人查看到您的资产情况。请慎重考虑是否绑定。进行绑定即代表用户已了解并愿意承担可能产生的风险。</p>
                <p class="confirmtext noIndent">4、用户应对使用其账户在中信证券客户终端进行的所有活动承担全部责任。中信证券有权判定和删除用户发布的违法违规、违反国家政策或本协议约定、以及其他可能导致社会不良影响的任何信息或言论。如发生以下任何一种情形，中信证券有权随时中断甚至终止向用户提供中信证券客户终端服务，包括但不限于限制或禁止用户发言、取消客户账号等：</p>
                <p class="confirmtext noIndent">（1）用户提供的资料不完整、不真实，或经中信证券要求而拒绝提供真实姓名、住址、联系方式等信息；</p>
                <p class="confirmtext noIndent">（2）用户发布本协议第一条所列违法违规言论；</p>
                <p class="confirmtext noIndent">（3）用户利用中信证券客户终端损害他人知识产权、名誉权等合法权利，或发表、传播影响中信证券声誉的言论；</p>
                <p class="confirmtext noIndent">（4）用户有违反本协议、违法违规的其他行为。</p>
                <p class="confirmtext noIndent">5、用户未经中信证券客户终端或中信证券书面同意，不得将从中信证券客户终端获取的证券投资资讯、投资建议、分析意见、市场研判及其他任何内容向第三方泄露或与第三方共享。用户不得利用从中信证券客户终端所获取的资讯、投资建议等进行营利性活动，或从事内幕交易、操纵市场等法律法规及监管机关、交易所业务规则禁止的交易行为。</p>
                <p class="confirmtext noIndent">6、如果用户使用中信证券互联网账户绑定资金账号，即表示您同意支持资金账号无密查询，对此造成的损失中信证券不承担任何责任。</p>
                <p class="confirmtext noIndent confirmsmtitle">第三条双方权利义务</p>
                <p class="confirmtext noIndent">1、用户应已在中信证券开立资金账户、证券账户或其他相关账户。</p>
                <p class="confirmtext noIndent">2、用户有权了解中信证券所提供收费服务的收费标准，并应按中信证券公布的服务费标准向中信证券支付服务费。</p>
                <p class="confirmtext noIndent">3、用户通过中信证券客户终端（包括PC或手机客户端等方式）以电子方式签署本协议，与用户签署纸质文件具有同等法律效力。</p>
                <p class="confirmtext noIndent">4、对于中信证券通过中信证券客户终端提供的收费服务，用户同意中信证券通过其资金账户扣取相关服务费用，用户须保证资金账户有足额资金支付。如用户在费用扣款日因账户余额不足导致未能足额缴纳服务费用的，中信证券将自动暂停提供所对应的收费服务项目，直至用户补足账户资金，且届时用户须再次通过平台提交相应服务申请。</p>
                <p class="confirmtext noIndent">5、内容的所有权</p>
                <p class="confirmtext noIndent">（1）中信证券客户终端上所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计，均由中信证券客户终端依法拥有其知识产权，包括但不限于商标权、与利权、著作权、商业秘密等。</p>
                <p class="confirmtext noIndent">2. 非经中信证券客户终端书面同意任何人不得擅自使用、修改、复制、公开传播、改发、散步、发行或公开发表本站程序或内容。</p>
                <p class="confirmtext noIndent">3. 用户同意，其发布上传到中信证券客户终端的任何原创内容，中信证券客户终端获得其全世界范围内免费的、永久性的、不可撤销的、非独家的、完全许可的权利和许可。平台有权将内容用于其他合法用途，包括但不限于部分或者全部地复制、修改、改编、翻译、组装、分拆、推广、发布、广播、表演、演绎、出版。</p>
                <p class="confirmtext noIndent confirmsmtitle">第四条特别提示用户应当知晓，中信证券严禁中信证券客户终端工作人员从事以下行为：</p>
                <p class="confirmtext noIndent">1、代客户作出投资决策。</p>
                <p class="confirmtext noIndent">2、以任何形式向客户做出保证其资产本金不受损失或者保证其取得最低收益的承诺，或与客户约定分享投资收益、分担投资亏损。</p>
                <p class="confirmtext noIndent">3、接受客户的全权委托而决定证券交易方向、交易种类、交易数量或交易价格。</p>
                <p class="confirmtext noIndent">4、泄露中信证券商业秘密，泄漏客户投资交易情况、商业秘密或其他个人隐私。</p>
                <p class="confirmtext noIndent">5、通过个人或公司以外的其他账户向客户收取服务费用，或以其他方式私下收取客户任何款项或财物。</p>
                <p class="confirmtext noIndent">6、向客户提供投资建议时，对证券价格的涨跌或者市场走势做出确定性的判断。</p>
                <p class="confirmtext noIndent">7、以虚假信息、市场传言或内幕信息为依据向客户提供投资分析、预测或建议。</p>
                <p class="confirmtext noIndent">8、法律法规规章或证券监管机关、行业自律组织禁止的其他行为。如用户存在以上任何一项情况，由此造成的一切后果将由用户自行承担。</p>
                <p class="confirmtext noIndent">如发现上述情形，用户应勿相信，并有权向中信证券客服进行投诉。</p>
                <p class="confirmtext noIndent confirmsmtitle">第五条免责声明</p>
                <p class="confirmtext noIndent">1．中信证券客户终端所刊载的所有资料及图表仅供参考使用。刊载这些文档并不构成对任何股份的收购、购买、认购、抛售或持有的邀约或意图。参阅中信证券客户终端所刊的文档的用户，应被视为已确认得悉上述立场。投资者依据中信证券客户终端提供的信息、资料及图表进行金融、证券等投资项目所造成的盈亏与中信证券客户终端无关。</p>
                <p class="confirmtext noIndent">2．用户明确同意使用中信证券客户终端的风险由用户个人承担。对于所有的用户注册资料、姓名、身份、发言内容以及其他行为，中信证券不负责提供任何担保。任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等，中信证券及时采取补救措施后，均得免责。</p>
                <p class="confirmtext noIndent">3、中信证券客户终端（包含各子页面、股市直播、电话会议等）页面展示信息的目的在于传播更多信息，相关信息均与中信证券立场无关。中信证券不保证该信息（包括但不限于文字、数据及图表）全部或者部分内容的准确性、真实性、完整性、有效性、及时性、原创性等。相关信息并未经过中信证券证实，不对用户构成任何投资建议，据此操作，风险自担。</p>
                <p class="confirmtext noIndent">4、除非明确说明，用户从中信证券客户终端所获取的信息不构成任何投资分析、预测或投资建议，仅作为一般信息供用户参考，中信证券客户终端并非提供投资分析、建议或预测等证券投资咨询服务功能的荐股软件，用户对中信证券中信证券客户终端的使用不应被视为中信证券向用户提供了任何类型的证券投资咨询服务。中信证券客户终端中含有的信息不作为用户投资决策依据，中信证券及中信证券客户终端不对用户据此作出的投资决策作任何保证收益或不会发生亏损的承诺。用户应当提高自我保护意识，防范信息欺诈，不偏信盲从通过中信证券客户终端其他用户传播的各类传闻。</p>
                <p class="confirmtext noIndent">5、中信证券客户终端的部分资讯信息是由第三方提供，对于该部分信息（以下简称“第三方资讯”），中信证券将说明信息来源，但不保证第三方资讯信息、数据资料的准确性、真实性、完整性等。中信证券对第三方资讯不承担任何责任，您同意将独自承受因使用或信赖第三方资讯而引致的任何损失。</p>
                <p class="confirmtext noIndent">6、中信证券将通过中信证券客户终端以及用户登记的其他信息接收渠道（包括但不限于手机、电子邮箱、微信等），向用户发送产品推荐、促销优惠等广告信息；如果不愿意接收此类信息，用户可以通过在相应信息接收渠道中的退订功能进行退订。</p>
                <p class="confirmtext noIndent">7、用户可以通过中信证券客户终端提供的功能模块，主动申请接收中信证券就您开通的特定业务发送的提醒、通知信息（“业务通知”），业务通知可能同时通过用户登记的其他信息接收渠道发送。用户同意：业务通知为中信证券免费提供的增值服务，除非中信证券存在故意或重大过失，否则对业务通知未能及时、准确发送给用户带来的损失，中信证券不承担责任。业务通知功能可能由于用户的软硬件设置、第三方软件干扰、通信运营商等外部原因无法提供，用户完全理解并同意独自承受相关风险。开通业务通知功能，并不构成对中信证券与您就相应业务签署的协议条款（包括但不限于：协议当事人的联系信息、通知方式等协议条款）的任何变更或补充。</p>
                <p class="confirmtext noIndent confirmsmtitle">第六条用户管理</p>
                <p class="confirmtext noIndent">1、考虑到中信证券客户终端的重要性，用户同意：</p>
                <p class="confirmtext noIndent">（1）提供及时、详尽及准确的个人资料。</p>
                <p class="confirmtext noIndent">（2）不断更新自己的注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。</p>
                <p class="confirmtext noIndent">（3）不冒用他人资料（包括不限于姓名、图片、公司机构名称、昵称等）如果用户提供的资料不准确，不真实，不合法有效，或者冒用他人资料，中信证券客户终端保留直接修改资料或者结束用户使用中信证券客户终端各项服务的权利。用户同意，用户提供的准确的个人资料作为认定用户与帐号的关联性以及用户身份的唯一证据。用户在享用各项服务的同时，同意接受中信证券客户终端提供的各类信息服务。</p>
                <p class="confirmtext noIndent">2、用户在平台发表的言论如有纯粹询问股价或发泄情绪、就同一主题重复提问且被投诉、评论区内发表任何形式的广告等现象将不予发表。</p>
                <p class="confirmtext noIndent">3、中信证券客户终端拥有对违反中信证券客户终端规则的用户进行处理的权力，直至禁止其在平台发布信息。</p>
                <p class="confirmtext noIndent">4、禁止任何使用发贴机等非法软件进行爆屏、违规发表的行为。</p>
                <p class="confirmtext noIndent">5、任何用户发现评论内容涉嫌侮辱或者诽谤他人、侵害他人合法权益的或违反本协议的，有权进行投诉。</p>
                <p class="confirmtext noIndent">6、为了能够给广大用户提供一个优质的交流平台，同时使会议直播能够良性、健康的发展，中信证券客户终端将对涉及反动、色情的头像、和发布不良内容的用户，进行严厉处理。一经发现此类行为，将给予封禁旧并清空所有发言的处罚。</p>
                <p class="confirmtext noIndent">7、用户在中信证券客户终端发表的原创内容，中信证券客户终端有权转载或引用。</p>
                <p class="confirmtext noIndent">8、凡中信证券客户终端出现以下情况之一，管理人员有权不提前通知用户直接删除，并依照有关规定作相应处罚。情节严重者，管理人员有权对其做出部分权限设置、暂停直至删除其账号。</p>
                <p class="confirmtext noIndent">l）发表含有本协议第一条禁止发布、传播内容的文章；</p>
                <p class="confirmtext noIndent">2. 发表不符合会议主题，或者无内容的灌水文章；</p>
                <p class="confirmtext noIndent">3）同一评论多次出现的；</p>
                <p class="confirmtext noIndent">4）违反本协议第六条的规定，发布广告的；</p>
                <p class="confirmtext noIndent">5）评论内容包含有严重影响用户浏览的内容或格式的；</p>
                <p class="confirmtext noIndent">6）其他中信证券客户终端认为不恰当的情况。</p>
                <p class="confirmtext noIndent">7）盗用他人头像或资料</p>
                <p class="confirmtext noIndent">8）伪装他人身份；</p>
                <p class="confirmtext noIndent">9）发送涉嫌性骚扰的文字、图片、视频及语音、恶意信息、诱骗信息、政治敏感信息；</p>
                <p class="confirmtext noIndent">10）违反国家法律法规：如非法赌博、涉黑涉暴、色情等违反法律法规的内容；</p>
                <p class="confirmtext noIndent">11）其他干扰用户正常使用的行为；如过度营销行为等</p>
                <p class="confirmtext noIndent confirmsmtitle">第七条服务条款的修改和修订</p>
                <p class="confirmtext noIndent">中信证券有权随时修改本协议条款，用户不同意条款变更的可以主动取消中信证券客户终端注册用户号，如果用户继续享用中信证券客户终端网络服务，则视为接受协议条款的变动。中信证券客户终端有权随时修改或中断中信证券客户终端免费服务而无需事先告知用户。若用户不同意本协议内容或不同意中信证券客户终端随时修改本协议，有权不使用中信证券客户终端提供的服务。但用户一旦使用中信证券客户终端提供的服务或者在中信证券客户终端修改本协议后继续使用其服务，则视为用户完全理解和认可本协议的全部内容及其修改条款。</p>
                <p class="confirmtext noIndent confirmsmtitle">第八条适用法律和管辖权</p>
                <p class="confirmtext noIndent">本协议适用中华人民共和国的法律。如出现纠纷，将交由中信证券所在地法院管辖。</p>
                <p class="confirmtext noIndent confirmsmtitle">第九条 生效条款。</p>
                <p class="confirmtext noIndent">本协议由中信证券股份有限公司通过“中信证券客户终端”平台发布，并已在用户注册前提示用户认真阅读本协议。用户在注册中信证券客户终端过程中点击”确认”按钮即表示自愿申请使用中信证券客户终端各项服务、完全同意并接受本协议条款。本协议自用户注册中信证券客户终端成功后即刻生效。</p>
                <p class="confirmtext noIndent confirmsmtitle">第十条 中信证券股份有限公司对本协议拥有最终解释权。</p>
          </div>
      </div>
      <div class="bmtn">
        <span id="closed" @click="close"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../../../util/util'
  import service_deal_often from '../../service/common/service_deal_often'
  import validatorUtil from '../../../../util/validatorUtil'
  import service_config from '../../service/common/service_config'
  import localService from '../../../../services/localService'
	export default{
		data(){
			return {
        randomImg:'',
        mobilecode:'',
        CheckToken:'',
        CheckCode:'',
        clearId:null,
        logintype:'',
        Count:service_config.downCount,
        prohibit:'',
        CHECKKEY:'',
        isClick:false,
        sendText:'点击获取验证码',
        xy:false
			}
		},
    ready(){

    },
    attached(){
      this.randomImg = '';
      this.logintype = this.$route.query.logintype || 1;
      this.CHECKKEY = '';
      this.isClick = false;
      this.getRandomImg();
    },
    detached(){ //销毁函数
      this.mobilecode = '';
    },
    methods: {
      inits(){

      },
      close(){
        document.title='手机校验';
        this.xy=false;
      },
      getRandomImg(){
        var that = this;
        service_deal_often.require41092()
          .then((data)=>{
            if(data.MESSAGE){
              that.randomImg = data.MESSAGE;
            }
            if(data.CHECKTOKEN){
              that.CheckToken = data.CHECKTOKEN
            }
            that.CheckCode = '';
          })
      },
      sendMsg(){
        if(this.clearId){
          return false;
        }
        var obj = {
          MobileCode:this.mobilecode,
          CheckToken:this.CheckToken,
          CheckCode:this.CheckCode
        };
        if(validatorUtil.isMobile(obj.MobileCode)){
          if(validatorUtil.isEmpty(obj.CheckCode)){
            return ($.toast("请输入验证码"),!1);
          }
        }else {
          return ($.toast("请输入正确的手机号码"),!1);
        }
        localService.readLocalMesg(['datetime','mobilecode'])
                .then((data)=>{
          let datetime = data.datetime;
          let mobilecode = data.mobilecode;
          let  num = (new Date()).getTime()  - datetime ;
//          console.log(datetime+"==="+(new Date()).getTime()+'----'+mobilecode)
          if(datetime&&mobilecode==this.mobilecode&&num < 80000){
            let  times = parseInt((80000 - num)/1000)
            $.alert("该手机号的验证码已发送，请"+times+"秒后再次发送");
            return ;
          }else {
            var that = this;
            $.showPreloader();
            service_deal_often.require40143(obj)
                    .then((data)=>{
              //that.getRandomImg();
              $.hidePreloader();
              if(data.ERRORNO<0){
                $.alert(data.ERRORMESSAGE);
                this.getRandomImg();
                return false;
              }else {
                localService.saveLocalMesg({mobilecode:this.mobilecode,datetime:(new Date()).getTime()});
                $.alert("验证码已请求成功，请注意查收");
              }
              that.isClick = true;
              that.CountDownFunc();
            })
          }
        })

      },
      CountDownFunc(){
        var that = this;
        that.clearId = setTimeout(function() {
          that.Count--;
          if(that.Count<1){
            that.clearCount();
          }else {
            that.prohibit = 'gray';
            that.sendText = that.Count+'秒后可重发';
            that.CountDownFunc();
          }
        }, 1e3)
      },
      clearCount(){
        this.Count = service_config.downCount;
        if(this.clearId){
          window.clearTimeout(this.clearId);
          this.clearId = null;
        }
        this.prohibit = '';
        this.sendText = '点击获取验证码';
      },
      changeAgree(){
        // var sUrl = '/deal/agreement';
        // this.$TZT.action10061({url:sUrl});
        document.title='互联网账户协议';
        this.xy=true;
      },
      nextFunc(){
        if(!validatorUtil.isMobile(this.mobilecode)){
          return ($.toast("请输入正确的手机号码"),!1);
        }
        if(!this.isClick){
          $.toast("请先获取验证码");
          return false;
        }
        var obj = {
          MobileCode:this.mobilecode,
          CHECKKEY:this.CHECKKEY
        };
        var that = this;
        if(validatorUtil.isMobile(obj.MobileCode)){
          if(obj.CHECKKEY == ''){
            $.toast("验证码不能为空");
            return false;
          }
        }else {
          $.toast("请输入正确的手机号码");
          return false;
        }
        $.showPreloader();
        service_deal_often.require44051(obj)
          .then((data)=>{
            $.hidePreloader();
            if(data.ERRORNO<0) {
              if (data.ERRORMESSAGE.indexOf('600115') >= 0 ) {
                $.alert("验证码不正确，请重新获取");
              }else{
                $.alert(data.ERRORMESSAGE);
              }
              return false;
            }
            util.setLocalStorage({acitve_phone:obj.MobileCode});
            util.setCookie(obj.MobileCode);
            var url = util.getUrlParameter('toPage');
            url = url || '/deal/login?logintype='+that.logintype;
            that.$TZT.action1964({url:url});
          })
      }
    },
    watch: {
      mobilecode:function(val,old){
        if(val == old) return;
        let v = ''+val.replace(/[^\d]/g,''),
            _self = this;
        console.log(v);
        this.$nextTick(function () { _self.mobilecode = v; })
      }
    }
	}
</script>

<style lang="less" scoped>
	@import '../../../../assets/less/variables.less';
  @import "../../../../assets/less/mixins.less";
  #closed {
    background: url(../../../../assets/img/close.png) no-repeat;
    background-size: 24px 24px;
    width: 24px;
    height: 24px;
    border: 0 none;
    position: fixed;
    top: 2.8rem;
    right: 10px;
  }
  // .show_warp .box {
  //   position: absolute;
  //   top: 20px;
  //   left: 0;
  // }
  .show_warp .bmtn {
    width: 100%;
    position: fixed;
    top: 2.8rem;
    left: 0px;
    text-align: center;
    height: 24px;
    z-index: 999;
  }
  .mt10 {
    margin-top: 0.5rem;
  }
  .login_form {
    padding: 1rem 0.5rem;
  }
  .input_form {
    border: 0;
  }
  .input_text {
    margin-bottom: 0.25rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border: 1px solid #CCC;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    position: relative;
  }
  .activeBtn {
    background-color: #FA5C60;
    height: 1.85rem;
    line-height: 1.85rem;
    position: relative;
    padding-left: 0.35rem;
    color: #FFFFFF;
    text-decoration: none;
    border-radius: 5px;
    display: inline-block;
    width: 33%;
    margin-left: 5%;
    font-size: 0.7rem;
    vertical-align: top;
  }
  .gray{
    background-color: #999;
    color: #FFFFFF;
  }
  .login_form .notice {
    padding: 1rem .5rem;
    font-size: 0.7rem;
    line-height: 180%;
    color: #999;
    margin: 0;
  }
  .ce_btn a {
    width: 100%;
    background: #f24957;
    height: 2rem;
    line-height: 2rem;
    border: 0;
    text-align: center;
    font-size: 0.9rem;
    color: #FFF;
    display: block;
    text-decoration: none;
  }
  .login_form .input_text .icon {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0;
    top: 0;
  }
  .login_form .input_text .icon.icon_phone {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACfUExURUxpcWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlYg9mQAAAA0dFJOUwCf/frrIO/+8+6AMPDpHPT3++jy8QP1cXon6hMi+QpXYfgOEVUF3WTnF94UXl0WJO3sCAJ6lJvDAAAA50lEQVRYw+2WSQ7CMAxFk5TGCbRAyzzP8wy5/9kIEoiGloUrdvitLC+ebEWKP2MEQRAEFp8HxoCD5D7eU9JiMqiqBJVqJHQJPY8Wy/nU7c1Wa9DYmbjYbp6lsTzLXQwcKZLegaVFbO9JpAjUMat9qgFWFNzY56PZwa5ntEjbnUA5gN3wkkcEyu0pKymQiEQkIhGJvny1+UTpzz+fKAu86H0Ii8YUX/VCo0VqmHVp+xWsKIhGWaIW+mRzEZfTq3VCgQ0RvoZw3HNajXK7i481NmiBV5M6Qb3p5Qhaj+gnAX4Q/QiCIP6eOwZnFbJyNQh+AAAAAElFTkSuQmCC) no-repeat center;
    background-size: 1.8rem;
  }
  .login_form .input_text .icon.icon_code {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8wOC8xNSeAT5IAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAEBklEQVR4nO2bTY4bRRSAPxNIJKSQYcEOZN9gzFzAvgG+AUYsnoSQcDQ7NvYoCyRWXiCkJzbOCQgniHOByD4AjGeHWM0IFlFC4izqdbrtabsG0l1u0Pskq93V1a6az/X3qj2t9XqNs5t3Dl2BpuOCIrigCC4ogguK4IIiuKAILiiCC4rggiK4oAguKIILiuCCIrigCC4ogguK4IIiuKAI71b9gSKSvR0DXwBtO69r8/sCmAFnAKpa6YdXLsh4CnSBl8DfwCvgecVltAj1/4TwZXwGnFRcRi2CxgQ5z4DvgJ9U9fcaykFE7gIT4Gvg2Mo+q7KMOgQNCa3me1V9sCuTiIyAI2CmqquS6x1gRJANsACmxbyq+idwKiLvAV9Z2Y0X1Ab+An4su2h/+JTQJQDmwGorT9fS7xWSe8BQRPqqutj62B+AL8nHu8qoaxZ7oap/bCdaqzknl7OLKUHOEvjUXktLm5Tk/xV48Rb13Uldgl7tSD+y485uYC2sZ6cDVV1YixlZWnf7HlV9uafMtyL1OmgGfKiqkz15joAnwJOtsaljxxUJqWuaL6VsMC7JswD6xTQbk6Z2Oq+6Xvto/EpaRAbkA/aSXFQSGi1IRKbAzwQ5vwB9Vb1MWYekXeymiMgRodUcW9J9VU3acjIaKYjQjY6BK0Kr2V73JKNxgmya/9xOL4FpIQAGQFX7qerTOEHk0zmElXHlq+N/wsEEqWprR/qcEKk3guSCbhKEltzTBQbASlVnNVdxg6TTvK1pzoFvCOFEz96fi0h/xz0dwow2JkTrSTlEqAHwkM0gFMqDUIBHbEb1SUnWxayF3ANQ1WEhfQQ83nHPjDDdL8nXRElJJmjP4Duw48YKWUSGhOl+SRizSiXWzcFmMRGZE6b0NmHjfVK4lgWnV4TA9doWRyoOGYv1KFnjWJiRjTuD1LHXNgcTpKotWwudEUTN7dLUzs+sWx6UZIJEZCgic4vQ31DYPMtmqo4dxyKyFpE1+fjTs7QJiUjZgi7JN96zrddsMC6ywHYUC69sKXBl56ua6/qGugbpa7OVqj4SkQtC91lZS+qQB6YPLd9o+15bIjwGFnsC1Vq+7Lpa0B0R+agkfUD+dGLMppxrYm6KrbZv/9v791FHC7oAPgbuA98WL9i+Ttem8aybrWJ71fsCWBFpWTl3rOxKqUPQjNA6TkXkA8IDxN9U9VmWoYoNMHua2gZOCT+SaJGHMpXRqvo/Dm1z6ykhNFgTntE/Jzy3qqqwFmF4uE1oObcIg/vJf+XXHSfk0XcbeL+mcmDr5y9VU3kL+r/R6Mc+TcAFRXBBEVxQBBcUwQVFcEERXFAEFxTBBUVwQRFcUAQXFMEFRXBBEVxQBBcUwQVFcEERXgMFhSKWUJsrDAAAAABJRU5ErkJggg==) no-repeat center;
    background-size: 1.8rem;
  }
  .login_form .input_text .icon.icon_code {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8wOC8xNSeAT5IAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAEBklEQVR4nO2bTY4bRRSAPxNIJKSQYcEOZN9gzFzAvgG+AUYsnoSQcDQ7NvYoCyRWXiCkJzbOCQgniHOByD4AjGeHWM0IFlFC4izqdbrtabsG0l1u0Pskq93V1a6az/X3qj2t9XqNs5t3Dl2BpuOCIrigCC4ogguK4IIiuKAILiiCC4rggiK4oAguKIILiuCCIrigCC4ogguK4IIiuKAI71b9gSKSvR0DXwBtO69r8/sCmAFnAKpa6YdXLsh4CnSBl8DfwCvgecVltAj1/4TwZXwGnFRcRi2CxgQ5z4DvgJ9U9fcaykFE7gIT4Gvg2Mo+q7KMOgQNCa3me1V9sCuTiIyAI2CmqquS6x1gRJANsACmxbyq+idwKiLvAV9Z2Y0X1Ab+An4su2h/+JTQJQDmwGorT9fS7xWSe8BQRPqqutj62B+AL8nHu8qoaxZ7oap/bCdaqzknl7OLKUHOEvjUXktLm5Tk/xV48Rb13Uldgl7tSD+y485uYC2sZ6cDVV1YixlZWnf7HlV9uafMtyL1OmgGfKiqkz15joAnwJOtsaljxxUJqWuaL6VsMC7JswD6xTQbk6Z2Oq+6Xvto/EpaRAbkA/aSXFQSGi1IRKbAzwQ5vwB9Vb1MWYekXeymiMgRodUcW9J9VU3acjIaKYjQjY6BK0Kr2V73JKNxgmya/9xOL4FpIQAGQFX7qerTOEHk0zmElXHlq+N/wsEEqWprR/qcEKk3guSCbhKEltzTBQbASlVnNVdxg6TTvK1pzoFvCOFEz96fi0h/xz0dwow2JkTrSTlEqAHwkM0gFMqDUIBHbEb1SUnWxayF3ANQ1WEhfQQ83nHPjDDdL8nXRElJJmjP4Duw48YKWUSGhOl+SRizSiXWzcFmMRGZE6b0NmHjfVK4lgWnV4TA9doWRyoOGYv1KFnjWJiRjTuD1LHXNgcTpKotWwudEUTN7dLUzs+sWx6UZIJEZCgic4vQ31DYPMtmqo4dxyKyFpE1+fjTs7QJiUjZgi7JN96zrddsMC6ywHYUC69sKXBl56ua6/qGugbpa7OVqj4SkQtC91lZS+qQB6YPLd9o+15bIjwGFnsC1Vq+7Lpa0B0R+agkfUD+dGLMppxrYm6KrbZv/9v791FHC7oAPgbuA98WL9i+Ttem8aybrWJ71fsCWBFpWTl3rOxKqUPQjNA6TkXkA8IDxN9U9VmWoYoNMHua2gZOCT+SaJGHMpXRqvo/Dm1z6ykhNFgTntE/Jzy3qqqwFmF4uE1oObcIg/vJf+XXHSfk0XcbeL+mcmDr5y9VU3kL+r/R6Mc+TcAFRXBBEVxQBBcUwQVFcEERXFAEFxTBBUVwQRFcUAQXFMEFRXBBEVxQBBcUwQVFcEERXgMFhSKWUJsrDAAAAABJRU5ErkJggg==) no-repeat center;
    background-size: 1.8rem;
  }
  .input_text .t1 {
    width: 100%;
    height: 1.5rem;
    padding: 0.4rem 2.5rem;
    line-height: normal;
    background: 0 0;
    border: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 0.7rem;
  }
  .login_form .input_text .t1 {
    padding: 0.4rem 0.5rem 0.4rem 2rem;
  }
  .login_form .input_text .code_pic {
    width: 4rem;
    height: 1.4rem;
    position: absolute;
    right: .05rem;
    top: 0;
  }
  .confirmtext {
    padding: 0 5px;
  }
  .confirmtext {
      text-indent: 26px;
      font-size: 14px;
  }
  .confirmtitle {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 20px 0 10px;
  }
  .confirmsmtitle {
      font-size: 18px;
      font-weight: bold;
      padding: 20px 0 10px;
  }
  .noIndent {
      text-indent: 0;
  }
  .bold {
      font-weight: bold;
  }
</style>
