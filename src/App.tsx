import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface FoodItem {
  display: string;
  reading: string;
}

const FOOD_LIST: FoodItem[] = [
  { display: 'チーズカレー', reading: 'ちーずかれー' },
  { display: '牛丼', reading: 'ぎゅうどん' },
  { display: 'カルボナーラ', reading: 'かるぼなーら' },
  { display: 'トマトシチュー', reading: 'とまとしちゅー' },
  { display: '生姜焼き肉定食', reading: 'しょうがやきにくていしょく' },
  { display: 'オムライス', reading: 'おむらいす' },
  { display: 'ハンバーグ', reading: 'はんばーぐ' },
  { display: 'とんかつ定食', reading: 'とんかつていしょく' },
  { display: '醤油ラーメン', reading: 'しょうゆらーめん' },
  { display: '味噌ラーメン', reading: 'みそらーめん' },
  { display: 'とんこつラーメン', reading: 'とんこつらーめん' },
  { display: 'つけ麺', reading: 'つけめん' },
  { display: '冷やし中華', reading: 'ひやしちゅうか' },
  { display: 'チャーハン', reading: 'ちゃーはん' },
  { display: '焼き餃子', reading: 'やきぎょうざ' },
  { display: '小籠包', reading: 'しょうろんぽう' },
  { display: '麻婆豆腐', reading: 'まーぼーどうふ' },
  { display: 'エビチリ', reading: 'えびちり' },
  { display: '青椒肉絲', reading: 'ちんじゃおろーす' },
  { display: '回鍋肉', reading: 'ほいこーろー' },
  { display: '酢豚', reading: 'すぶた' },
  { display: '天津飯', reading: 'てんしんはん' },
  { display: '親子丼', reading: 'おやこどん' },
  { display: 'カツ丼', reading: 'かつどん' },
  { display: '天丼', reading: 'てんどん' },
  { display: 'うな重', reading: 'うなじゅう' },
  { display: '海鮮丼', reading: 'かいせんどん' },
  { display: 'マグロの刺身', reading: 'まぐろのさしみ' },
  { display: 'サーモン寿司', reading: 'さーもんずし' },
  { display: 'いくら軍艦', reading: 'いくらぐんかん' },
  { display: 'かっぱ巻き', reading: 'かっぱまき' },
  { display: 'きつねうどん', reading: 'きつねうどん' },
  { display: 'たぬきそば', reading: 'たぬきそば' },
  { display: 'ざるそば', reading: 'ざるそば' },
  { display: '天ぷらそば', reading: 'てんぷらそば' },
  { display: '焼きうどん', reading: 'やきうどん' },
  { display: 'ソース焼きそば', reading: 'そーすやきそば' },
  { display: 'お好み焼き', reading: 'おこのみやき' },
  { display: 'たこ焼き', reading: 'たこやき' },
  { display: 'もんじゃ焼き', reading: 'もんじゃやき' },
  { display: '唐揚げ定食', reading: 'からあげていしょく' },
  { display: 'チキン南蛮', reading: 'ちきんなんばん' },
  { display: 'サバの味噌煮', reading: 'さばのみそに' },
  { display: 'サンマの塩焼き', reading: 'さんまのしおやき' },
  { display: '肉じゃが', reading: 'にくじゃが' },
  { display: '筑前煮', reading: 'ちくぜんに' },
  { display: 'ぶり大根', reading: 'ぶりだいこん' },
  { display: 'おでん', reading: 'おでん' },
  { display: 'すき焼き', reading: 'すきやき' },
  { display: 'しゃぶしゃぶ', reading: 'しゃぶしゃぶ' },
  { display: 'もつ鍋', reading: 'もつなべ' },
  { display: 'キムチ鍋', reading: 'きむちなべ' },
  { display: 'ペペロンチーノ', reading: 'ぺぺろんちーの' },
  { display: 'ミートソース', reading: 'みーとそーす' },
  { display: 'ナポリタン', reading: 'なぽりたん' },
  { display: 'たらこスパゲティ', reading: 'たらこすぱげてぃ' },
  { display: 'マルゲリータピザ', reading: 'まるげりーたぴざ' },
  { display: 'グラタン', reading: 'ぐらたん' },
  { display: 'ドリア', reading: 'どりあ' },
  { display: 'ビーフシチュー', reading: 'びーふしちゅー' },
  { display: 'クリームシチュー', reading: 'くりーむしちゅー' },
  { display: 'ロールキャベツ', reading: 'ろーるきゃべつ' },
  { display: 'ポトフ', reading: 'ぽとふ' },
  { display: 'ステーキ', reading: 'すてーき' },
  { display: 'ローストビーフ', reading: 'ろーすとびーふ' },
  { display: 'フライドチキン', reading: 'ふらいどちきん' },
  { display: 'フライドポテト', reading: 'ふらいどぽてと' },
  { display: 'チーズバーガー', reading: 'ちーずばーがー' },
  { display: 'ホットドッグ', reading: 'ほっとどっぐ' },
  { display: 'サンドイッチ', reading: 'さんどいっち' },
  { display: 'クロックムッシュ', reading: 'くろっくむっしゅ' },
  { display: 'クロワッサン', reading: 'くろわっさん' },
  { display: 'カレーパン', reading: 'かれーぱん' },
  { display: 'メロンパン', reading: 'めろんぱん' },
  { display: 'あんぱん', reading: 'あんぱん' },
  { display: 'クリームパン', reading: 'くりーむぱん' },
  { display: 'フレンチトースト', reading: 'ふれんちとーすと' },
  { display: 'パンケーキ', reading: 'ぱんけーき' },
  { display: 'ワッフル', reading: 'わっふる' },
  { display: 'クレープ', reading: 'くれーぷ' },
  { display: 'ショートケーキ', reading: 'しょーとけーき' },
  { display: 'チーズケーキ', reading: 'ちーずけーき' },
  { display: 'モンブラン', reading: 'もんぶらん' },
  { display: 'ティラミス', reading: 'てぃらみす' },
  { display: 'シュークリーム', reading: 'しゅーくりーむ' },
  { display: 'エクレア', reading: 'えくれあ' },
  { display: 'カスタードプリン', reading: 'かすたーどぷりん' },
  { display: 'コーヒーゼリー', reading: 'こーひーぜりー' },
  { display: 'フルーツパフェ', reading: 'ふるーつぱふぇ' },
  { display: 'ソフトクリーム', reading: 'そふとくりーむ' },
  { display: 'かき氷', reading: 'かきごおり' },
  { display: 'みたらし団子', reading: 'みたらしだんご' },
  { display: 'いちご大福', reading: 'いちごだいふく' },
  { display: 'たい焼き', reading: 'たいやき' },
  { display: 'どら焼き', reading: 'どらやき' },
  { display: '今川焼き', reading: 'いまがわやき' },
  { display: 'わらび餅', reading: 'わらびもち' },
  { display: '抹茶アイス', reading: 'まっちゃあいす' },
  { display: 'おにぎり', reading: 'おにぎり' },
  { display: '茶碗蒸し', reading: 'ちゃわんむし' },
];

const GAME_DURATION = 60;

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>(
    'start'
  );
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [score, setScore] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [currentFood, setCurrentFood] = useState<FoodItem>(FOOD_LIST[0]);
  const [inputValue, setInputValue] = useState<string>('');
  const [flashSuccess, setFlashSuccess] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const pickNextFood = (prevFood?: FoodItem) => {
    let next: FoodItem;
    do {
      const randomIndex = Math.floor(Math.random() * FOOD_LIST.length);
      next = FOOD_LIST[randomIndex];
    } while (
      prevFood &&
      next.reading === prevFood.reading &&
      FOOD_LIST.length > 1
    );

    setCurrentFood(next);
  };

  const startGame = () => {
    setScore(0);
    setCompletedCount(0);
    setTimeLeft(GAME_DURATION);
    setInputValue('');
    pickNextFood();
    setGameState('playing');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const normalizeHiragana = (str: string) => {
    return str
      .replace(/[\u30a1-\u30f6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
      )
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const normalizedInput = normalizeHiragana(val);

    if (
      normalizedInput === currentFood.reading ||
      val.trim() === currentFood.display
    ) {
      setScore((prev) => prev + 10);
      setCompletedCount((prev) => prev + 1);

      setInputValue('');
      pickNextFood(currentFood);

      setFlashSuccess(true);
      setTimeout(() => setFlashSuccess(false), 200);
    }
  };

  const handleSkip = () => {
    setInputValue('');
    pickNextFood(currentFood);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <div className="app-container">
      <div className={`game-card ${flashSuccess ? 'flash-success' : ''}`}>
        {gameState === 'start' && (
          <div className="screen start-screen">
            <div className="badge">全100種類のグルメ収録！</div>
            <h1 className="title">
              モグモグ！
              <br />
              フリック道場
            </h1>
            <p className="description">
              次々と表示される美味しい食べ物を
              <br />
              <strong>60秒間</strong>でひたすら入力しよう！
              <br />
              1フレーズ完成ごとに <strong>+10点</strong>！
            </p>
            <button className="primary-btn" onClick={startGame}>
              ゲームスタート！
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="screen play-screen">
            <div className="status-bar">
              <div className={`stat-box ${timeLeft <= 10 ? 'urgent' : ''}`}>
                <span className="stat-label">のこり時間</span>
                <span className="stat-value">
                  {timeLeft}
                  <small>秒</small>
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-label">スコア</span>
                <span className="stat-value">
                  {score}
                  <small>点</small>
                </span>
              </div>
            </div>

            <div className="question-area">
              <div className="reading-text">{currentFood.reading}</div>
              <div className="display-text">{currentFood.display}</div>
            </div>

            <div className="input-area">
              <input
                key={currentFood.reading}
                ref={inputRef}
                type="text"
                className="flick-input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="ここに入力！"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                autoFocus
              />
              <button type="button" className="skip-btn" onClick={handleSkip}>
                パスする ↻
              </button>
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className="screen result-screen">
            <h2 className="result-title">タイムアップ！</h2>
            <div className="result-score-box">
              <span className="result-label">最終スコア</span>
              <div className="result-score">
                {score}
                <span>点</span>
              </div>
              <div className="result-sub">
                完食したメニュー：{completedCount}品
              </div>
            </div>
            <button className="primary-btn" onClick={startGame}>
              もう一回あそぶ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
