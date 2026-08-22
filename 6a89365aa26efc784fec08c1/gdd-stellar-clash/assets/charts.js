(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var danger = style.getPropertyValue('--danger').trim();
  var success = style.getPropertyValue('--success').trim();
  var warn = style.getPropertyValue('--warn').trim();

  var baseGrid = {
    top: 40,
    left: 60,
    right: 30,
    bottom: 50,
    containLabel: true
  };

  var baseAxisLine = { lineStyle: { color: rule } };
  var baseAxisLabel = { color: muted, fontSize: 12 };
  var baseSplitLine = { lineStyle: { color: rule, type: 'dashed', opacity: 0.5 } };

  // ===== Chart 1: Role Radar =====
  var chartRadar = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  chartRadar.setOption({
    animation: false,
    backgroundColor: 'transparent',
    legend: {
      data: ['突击者', '守卫者', '支援者', '爆破手'],
      top: 10,
      textStyle: { color: ink, fontSize: 13 },
      itemWidth: 16,
      itemHeight: 10
    },
    radar: {
      indicator: [
        { name: '血量', max: 1200 },
        { name: '伤害', max: 90 },
        { name: '移速', max: 7.0 },
        { name: '攻速(逆)', max: 1.2 },
        { name: '技能伤害', max: 220 },
        { name: '辅助能力', max: 100 }
      ],
      center: ['50%', '58%'],
      radius: '65%',
      axisName: { color: ink, fontSize: 13 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: ['rgba(0,217,255,0.02)', 'rgba(0,217,255,0.04)'] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: [825, 70, 6.9, 0.75, 165, 20], name: '突击者', itemStyle: { color: danger }, lineStyle: { color: danger, width: 2 }, areaStyle: { color: 'rgba(255,94,126,0.15)' } },
        { value: [1150, 65, 5.25, 1.1, 0, 30], name: '守卫者', itemStyle: { color: success }, lineStyle: { color: success, width: 2 }, areaStyle: { color: 'rgba(74,222,128,0.15)' } },
        { value: [925, 42.5, 6.4, 0.9, 0, 85], name: '支援者', itemStyle: { color: accent }, lineStyle: { color: accent, width: 2 }, areaStyle: { color: 'rgba(0,217,255,0.15)' } },
        { value: [975, 80, 5.65, 1.05, 200, 10], name: '爆破手', itemStyle: { color: accent2 }, lineStyle: { color: accent2, width: 2 }, areaStyle: { color: 'rgba(255,140,66,0.15)' } }
      ],
      symbolSize: 5
    }],
    tooltip: { trigger: 'item', appendToBody: true }
  });
  window.addEventListener('resize', function() { chartRadar.resize(); });

  // ===== Chart 2: Character Stats Bar =====
  var chartStats = echarts.init(document.getElementById('chart-stats-bar'), null, { renderer: 'svg' });
  chartStats.setOption({
    animation: false,
    backgroundColor: 'transparent',
    legend: {
      data: ['血量(HP)', 'DPS', '移速(m/s×10)'],
      top: 10,
      textStyle: { color: ink, fontSize: 13 },
      itemWidth: 16,
      itemHeight: 10
    },
    grid: baseGrid,
    xAxis: {
      type: 'category',
      data: ['闪刃', '影舞', '铁壁', '守望', '星语', '灵泉', '烈焰', '雷霆'],
      axisLine: baseAxisLine,
      axisLabel: { color: ink, fontSize: 12, rotate: 0 }
    },
    yAxis: {
      type: 'value',
      axisLine: baseAxisLine,
      axisLabel: baseAxisLabel,
      splitLine: baseSplitLine
    },
    series: [
      { name: '血量(HP)', type: 'bar', data: [800, 850, 1200, 1100, 900, 950, 950, 1000], itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }, barGap: '20%' },
      { name: 'DPS', type: 'bar', data: [93.8, 92.9, 50, 66.7, 44.4, 50, 81.8, 70], itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] } },
      { name: '移速(m/s×10)', type: 'bar', data: [70, 68, 55, 50, 65, 63, 58, 55], itemStyle: { color: accent3, borderRadius: [4, 4, 0, 0] } }
    ],
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } }
  });
  window.addEventListener('resize', function() { chartStats.resize(); });

  // ===== Chart 3: TTK Comparison =====
  var chartTTK = echarts.init(document.getElementById('chart-ttk'), null, { renderer: 'svg' });
  chartTTK.setOption({
    animation: false,
    backgroundColor: 'transparent',
    legend: {
      data: ['纯普攻TTK', '含技能TTK'],
      top: 10,
      textStyle: { color: ink, fontSize: 13 },
      itemWidth: 16,
      itemHeight: 10
    },
    grid: baseGrid,
    xAxis: {
      type: 'category',
      data: ['突击→守卫', '突击→突击', '爆破→守卫', '爆破→支援', '守卫→突击', '守卫→支援'],
      axisLine: baseAxisLine,
      axisLabel: { color: ink, fontSize: 11, rotate: 15 }
    },
    yAxis: {
      type: 'value',
      name: '秒',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLine: baseAxisLine,
      axisLabel: baseAxisLabel,
      splitLine: baseSplitLine,
      max: 18
    },
    series: [
      {
        name: '纯普攻TTK',
        type: 'bar',
        data: [12.8, 8.5, 14.7, 11.0, 16.0, 20.0],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '含技能TTK',
        type: 'bar',
        data: [7.5, 3.8, 5.2, 3.9, 16.0, 12.0],
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
      }
    ],
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
    markLine: {
      silent: true,
      data: [{
        yAxis: 5,
        lineStyle: { color: success, type: 'dashed', width: 2 },
        label: { formatter: '目标区间 3-5s', color: success, fontSize: 11, position: 'end' }
      }]
    }
  });
  window.addEventListener('resize', function() { chartTTK.resize(); });

  // ===== Chart 4: Growth Curve =====
  var chartGrowth = echarts.init(document.getElementById('chart-growth'), null, { renderer: 'svg' });
  var levels = [];
  var xpData = [];
  var cumulativeXp = [];
  var total = 0;
  for (var L = 1; L <= 20; L++) {
    var xp = Math.round(100 * Math.pow(L, 1.5) + 50 * L);
    levels.push('Lv.' + L);
    xpData.push(xp);
    total += xp;
    cumulativeXp.push(total);
  }
  chartGrowth.setOption({
    animation: false,
    backgroundColor: 'transparent',
    legend: {
      data: ['单级经验需求', '累计经验'],
      top: 10,
      textStyle: { color: ink, fontSize: 13 },
      itemWidth: 16,
      itemHeight: 10
    },
    grid: baseGrid,
    xAxis: {
      type: 'category',
      data: levels,
      axisLine: baseAxisLine,
      axisLabel: { color: muted, fontSize: 10, rotate: 45 }
    },
    yAxis: [
      {
        type: 'value',
        name: '单级XP',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: baseAxisLine,
        axisLabel: baseAxisLabel,
        splitLine: baseSplitLine
      },
      {
        type: 'value',
        name: '累计XP',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: accent2 } },
        axisLabel: { color: accent2, fontSize: 11 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '单级经验需求',
        type: 'bar',
        data: xpData,
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '累计经验',
        type: 'line',
        yAxisIndex: 1,
        data: cumulativeXp,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: accent2, width: 2 },
        itemStyle: { color: accent2 },
        areaStyle: { color: 'rgba(255,140,66,0.1)' }
      }
    ],
    tooltip: { trigger: 'axis', appendToBody: true }
  });
  window.addEventListener('resize', function() { chartGrowth.resize(); });

  // ===== Chart 5: Revenue / Content Comparison =====
  var chartRev = echarts.init(document.getElementById('chart-revenue'), null, { renderer: 'svg' });
  chartRev.setOption({
    animation: false,
    backgroundColor: 'transparent',
    legend: {
      data: ['F2P玩家', '付费玩家'],
      top: 10,
      textStyle: { color: ink, fontSize: 13 },
      itemWidth: 16,
      itemHeight: 10
    },
    grid: baseGrid,
    xAxis: {
      type: 'category',
      data: ['新角色', '稀有皮肤', '史诗皮肤', '传说皮肤', '表情/喷漆', '外观券(×100)'],
      axisLine: baseAxisLine,
      axisLabel: { color: ink, fontSize: 11, rotate: 15 }
    },
    yAxis: {
      type: 'value',
      name: '赛季获取量',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: baseAxisLine,
      axisLabel: baseAxisLabel,
      splitLine: baseSplitLine
    },
    series: [
      {
        name: 'F2P玩家',
        type: 'bar',
        data: [1, 1, 1, 0, 12, 16],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '付费玩家',
        type: 'bar',
        data: [3, 5, 3, 1, 40, 48],
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
      }
    ],
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } }
  });
  window.addEventListener('resize', function() { chartRev.resize(); });

  // ===== Chart 6: Retention Curve =====
  var chartRet = echarts.init(document.getElementById('chart-retention'), null, { renderer: 'svg' });
  var days = [];
  var retentionData = [];
  var targetData = [];
  for (var d = 1; d <= 30; d++) {
    days.push('D' + d);
    var actual;
    if (d === 1) actual = 48;
    else if (d <= 3) actual = 48 - (d - 1) * 6;
    else if (d <= 7) actual = 36 - (d - 3) * 3.5;
    else if (d <= 14) actual = 22 - (d - 7) * 1.2;
    else actual = 13.6 - (d - 14) * 0.4;
    retentionData.push(Math.round(actual * 10) / 10);
    if (d === 1) targetData.push(45);
    else if (d === 7) targetData.push(20);
    else if (d === 30) targetData.push(8);
    else targetData.push(null);
  }
  chartRet.setOption({
    animation: false,
    backgroundColor: 'transparent',
    legend: {
      data: ['预期留存率', '目标基准'],
      top: 10,
      textStyle: { color: ink, fontSize: 13 },
      itemWidth: 16,
      itemHeight: 10
    },
    grid: baseGrid,
    xAxis: {
      type: 'category',
      data: days,
      axisLine: baseAxisLine,
      axisLabel: { color: muted, fontSize: 10, interval: 2 }
    },
    yAxis: {
      type: 'value',
      name: '留存率(%)',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: baseAxisLine,
      axisLabel: baseAxisLabel,
      splitLine: baseSplitLine,
      max: 60
    },
    series: [
      {
        name: '预期留存率',
        type: 'line',
        data: retentionData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: accent, width: 2 },
        itemStyle: { color: accent },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,217,255,0.25)' },
            { offset: 1, color: 'rgba(0,217,255,0.01)' }
          ])
        },
        markPoint: {
          data: [
            { name: 'D1', value: retentionData[0], xAxis: 0, yAxis: retentionData[0], itemStyle: { color: accent }, label: { color: ink, fontSize: 11 } },
            { name: 'D7', value: retentionData[6], xAxis: 6, yAxis: retentionData[6], itemStyle: { color: accent2 }, label: { color: ink, fontSize: 11 } },
            { name: 'D30', value: retentionData[29], xAxis: 29, yAxis: retentionData[29], itemStyle: { color: accent3 }, label: { color: ink, fontSize: 11 } }
          ]
        }
      },
      {
        name: '目标基准',
        type: 'scatter',
        data: targetData.map(function(v, i) { return v !== null ? [i, v] : null; }).filter(function(v) { return v !== null; }),
        symbolSize: 12,
        itemStyle: { color: warn, borderColor: warn, borderWidth: 2 },
        tooltip: { formatter: function(p) { return '目标: ' + p.value[1] + '%'; } }
      }
    ],
    tooltip: { trigger: 'axis', appendToBody: true }
  });
  window.addEventListener('resize', function() { chartRet.resize(); });

  // ===== Chart 7: Gantt Chart =====
  var chartGantt = echarts.init(document.getElementById('chart-gantt'), null, { renderer: 'svg' });
  var phases = [
    { name: 'Phase 1: 原型验证', start: 0, end: 3, color: success },
    { name: 'Phase 2: Alpha开发', start: 3, end: 6, color: accent },
    { name: 'Phase 3: Beta开发', start: 6, end: 9, color: accent2 },
    { name: 'Phase 4: 上线发布', start: 9, end: 12, color: accent3 }
  ];
  var modules = [
    { name: '核心战斗系统', start: 0, end: 4, phase: 0 },
    { name: '角色系统(8角色)', start: 1, end: 6, phase: 0 },
    { name: '地图设计', start: 0, end: 3, phase: 0 },
    { name: '匹配系统', start: 3, end: 6, phase: 1 },
    { name: '养成系统', start: 4, end: 6, phase: 1 },
    { name: 'UI/UX系统', start: 4, end: 8, phase: 1 },
    { name: '商业化系统', start: 6, end: 9, phase: 2 },
    { name: '社交系统', start: 6, end: 9, phase: 2 },
    { name: '赛季系统', start: 7, end: 9, phase: 2 },
    { name: '性能优化', start: 8, end: 10, phase: 2 },
    { name: '封闭测试', start: 9, end: 10, phase: 3 },
    { name: '开放测试', start: 10, end: 11, phase: 3 },
    { name: '正式上线', start: 11, end: 12, phase: 3 },
    { name: '赛事系统', start: 10, end: 12, phase: 3 }
  ];
  var phaseColors = [success, accent, accent2, accent3];
  chartGantt.setOption({
    animation: false,
    backgroundColor: 'transparent',
    grid: {
      top: 50,
      left: 150,
      right: 30,
      bottom: 40,
      containLabel: false
    },
    xAxis: {
      type: 'value',
      name: '月份',
      nameTextStyle: { color: muted, fontSize: 12 },
      min: 0,
      max: 12,
      interval: 1,
      axisLine: baseAxisLine,
      axisLabel: { color: muted, fontSize: 11, formatter: 'M{value}' },
      splitLine: baseSplitLine
    },
    yAxis: {
      type: 'category',
      data: modules.map(function(m) { return m.name; }),
      axisLine: baseAxisLine,
      axisLabel: { color: ink, fontSize: 12 },
      splitLine: { show: true, lineStyle: { color: rule, opacity: 0.3 } }
    },
    series: [{
      type: 'custom',
      renderItem: function(params, api) {
        var categoryIndex = api.value(0);
        var start = api.coord([api.value(1), categoryIndex]);
        var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, 1])[1] * 0.6;
        var color = phaseColors[api.value(3)];
        return {
          type: 'rect',
          shape: {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          },
          style: {
            fill: color,
            opacity: 0.8,
            stroke: color,
            lineWidth: 1
          }
        };
      },
      data: modules.map(function(m, i) {
        return [i, m.start, m.end, m.phase];
      }),
      tooltip: {
        formatter: function(p) {
          var m = modules[p.dataIndex];
          return m.name + '<br/>周期: M' + m.start + ' - M' + m.end;
        }
      }
    }],
    tooltip: { trigger: 'item', appendToBody: true }
  });
  window.addEventListener('resize', function() { chartGantt.resize(); });

})();
