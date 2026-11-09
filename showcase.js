'use strict';
// Public demonstration only. All candidates, answers and revisions are scripted.
// No uploads, model calls, analytics, storage or core application logic.
const cases = {
  product: {
    name:'林知夏',target:'产品实习生',education:'信息管理与信息系统 · 本科',educationNotes:'课程方向：数据库、统计学、用户研究与交互设计。',section:'项目经历',project:'校园闲置交易小程序',role:'产品设计 · 课程项目',skills:'Figma 原型设计、需求分析、问卷整理与用户访谈。',
    before:'参与校园闲置交易小程序项目，负责用户调研和原型设计。',
    question:'调研中最具体的问题是什么？你如何把这个发现转化为产品方案？',
    answer:'同学担心交易双方信息不对称。我整理访谈记录后，设计了商品状态标签和校内身份说明，并在原型中演示发布与预约流程。目前完成了课程展示，还没有上线。',
    after:'围绕校园闲置交易中的信息不对称问题，梳理用户访谈记录，将商品状态标签与校内身份说明转化为产品需求，完成发布、预约流程的交互原型及课程展示。',
    explanation:'把“参与”展开为问题、个人行动与交付物，保留课程项目的实际完成阶段。',
    focus:'调研发现 → 需求提炼 → 方案交付'
  },
  materials: {
    name:'陈知行',target:'材料研发实习生',education:'材料工程 · 硕士',educationNotes:'研究方向：聚合物材料制备、表征与实验设计。',section:'科研经历',project:'聚合物薄膜配方与性能研究',role:'研究生课题',skills:'材料制备、拉伸测试、DSC、Origin、实验数据整理。',
    before:'研究聚合物薄膜性能，负责样品制备和数据分析。',
    question:'你具体调整了哪些变量？当前完成了什么，哪些仍在实验中？',
    answer:'我调整了添加剂比例和固化温度，完成首轮样品制备、拉伸测试和 DSC，并整理了配方与测试数据。现在还在筛选配方，最优条件没有确定。',
    after:'围绕添加剂比例与固化温度开展聚合物薄膜配方筛选，完成首轮样品制备、拉伸测试及 DSC 表征，整理配方—性能数据并比较不同条件下的性能变化；目前处于配方筛选阶段。',
    explanation:'突出实验变量、表征方法与数据分析，准确说明研究进度，不把探索过程写成已取得最优结果。',
    focus:'研究变量 → 实验表征 → 当前进度'
  },
  algorithm: {
    name:'周明远',target:'计算机视觉算法实习生',education:'计算机科学与技术 · 本科',educationNotes:'课程方向：机器学习、图像处理与数据结构。',section:'项目经历',project:'图像分类模型复现与误差分析',role:'个人课程项目',skills:'Python、PyTorch、模型训练、图像预处理与结果分析。',
    before:'使用 PyTorch 训练图像分类模型，优化模型效果。',
    question:'除了跑通训练，你亲自做了哪些分析？有什么可以说明的比较结果？',
    answer:'我复现了基线训练，整理错误预测，发现部分近似类别容易混淆。我比较了不同数据增强设置，并记录验证集表现。没有线上部署，也没有系统的最终性能结论。',
    after:'基于 PyTorch 复现图像分类基线，整理错误预测并分析近似类别的混淆情况；对比不同数据增强设置下的验证集表现，记录训练配置与实验结果，为后续模型改进提供依据。',
    explanation:'用实际分析与对比替代笼统的“优化效果”，不虚构准确率提升或线上部署。',
    focus:'基线复现 → 错误分析 → 对照实验'
  }
};
const stages = [
  {speaker:'你的原始描述',title:'经历有了，贡献还可以说得更清楚。',next:'查看第一个追问 →'},
  {speaker:'AI 的一个具体问题',title:'先讨论最值得补充的这一处。',next:'用示例回答补充 →'},
  {speaker:'用户补充的事实',title:'关键的信息，往往来自这一轮回答。',next:'查看修改后的表述 →'},
  {speaker:'工作台更新草稿',title:'让岗位相关的行动与产出更清晰。',next:'从头体验 ↺'}
];
const $=id=>document.getElementById(id);
let active='product',step=0;
function p(cls,text){const el=document.createElement('p');el.className=cls;el.textContent=text;return el;}
function render(){
  const c=cases[active],s=stages[step];
  $('target').textContent='本次目标：'+c.target;
  $('candidate').textContent=c.name;$('resume-target').textContent='求职意向：'+c.target;
  $('education').textContent=c.education;$('education-notes').textContent=c.educationNotes;
  $('section-title').textContent=c.section;$('project').textContent=c.project;$('project-role').textContent=c.role;$('skills').textContent=c.skills;
  const host=$('conversation');host.replaceChildren();host.append(p('speaker',s.speaker));
  const heading=document.createElement('h3');heading.textContent=s.title;host.append(heading);
  host.append(p('quote',[c.before,c.question,c.answer,c.after][step]));
  host.append(p('explain',step===0?'先理解原简历，再围绕目标岗位找到具体的讨论重点。':step===1?'这里一次只讨论一个问题，实际应用支持继续补充或跳过。':step===2?'提交回答即作为后续改写的依据，无需再逐项打勾确认。':c.explanation));
  if(step===3)host.append(p('fact','本次表达重点：'+c.focus));
  $('excerpt').textContent=step===3?c.after:c.before;$('paper').classList.toggle('updated',step===3);
  $('paper-state').textContent=step===3?'已基于示例回答更新':'原始表述';
  $('revision-note').textContent=step===3?'已补充个人行动与具体产出':'等待补充具体经历';
  $('annotation').textContent=step===3?'事实没有凭空增加，表达更有信息量。':'好的表达，从具体事实开始。';
  $('previous').disabled=step===0;$('next').textContent=s.next;
  document.querySelectorAll('[data-step]').forEach(el=>{const i=Number(el.dataset.step);if(i===step)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');el.classList.toggle('done',i<step);});
  document.querySelectorAll('[data-case]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.case===active)));
}
document.querySelectorAll('[data-case]').forEach(el=>el.addEventListener('click',()=>{active=el.dataset.case;step=0;render();}));
$('next').addEventListener('click',()=>{step=(step+1)%4;render();});
$('previous').addEventListener('click',()=>{if(step>0){step--;render();}});
$('color').addEventListener('change',()=>{$('paper').style.setProperty('--paper-color',({blue:'#2c547f',green:'#28704e',red:'#9a3447'})[$('color').value]);});
const screens={build:{alt:'从零制作工作台，左侧逐步填写，右侧实时呈现简历',caption:'从零制作 · 边整理经历，边看完整简历。点击图片查看原图。'},collaboration:{alt:'逐项协作优化工作台，围绕一段经历提问，旁边显示当前稿',caption:'协作优化 · 一次讨论一个重点，修改在工作台里呈现。点击图片查看原图。'},themes:{alt:'主题与排版选择浮层，学校主题与简历内容独立选择',caption:'主题与排版 · 学校、配色、版式分别选择。点击图片查看原图。'}};
document.querySelectorAll('[data-screen]').forEach(el=>el.addEventListener('click',()=>{const key=el.dataset.screen,s=screens[key];$('screen-image').src='docs/images/'+key+'.png';$('screen-image').alt=s.alt;$('screen-link').href='docs/images/'+key+'.png';$('screen-caption').textContent=s.caption;document.querySelectorAll('[data-screen]').forEach(b=>b.setAttribute('aria-pressed',String(b===el)));}));
render();
