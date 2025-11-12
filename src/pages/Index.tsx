import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [input, setInput] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [storyboardMode, setStoryboardMode] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    if (!input.trim()) return;
    
    setIsTyping(true);
    setDisplayText('');
    
    const fullText = storyboardMode 
      ? `> ГЕНЕРАЦИЯ РАСКАДРОВКИ...\n\n${input}\n\n[СЦЕНА 1]\nКадр: Общий план\nОписание: ${input.slice(0, 50)}...\n\n[СЦЕНА 2]\nКадр: Крупный план\nДействие: Развитие сюжета\n\n[СЦЕНА 3]\nКадр: Финальная сцена\nРезультат: Завершение\n\n> РАСКАДРОВКА ГОТОВА`
      : `> ОБРАБОТКА ЗАПРОСА...\n\n${input}\n\n> ГЕНЕРАЦИЯ ЗАВЕРШЕНА`;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/files/3f2f229e-78b1-4d64-970d-27aa0f826355.jpg)',
          filter: 'brightness(0.6) contrast(1.2)',
        }}
      />
      
      <div className="absolute inset-0 scanlines opacity-20" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="relative bg-gradient-to-b from-[#1a3a1a] to-[#0a1a0a] p-2 shadow-2xl" style={{ borderRadius: '24px' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" style={{ borderRadius: '24px' }} />
            <div className="absolute top-4 left-8 w-32 h-24 bg-white/5 blur-2xl rounded-full pointer-events-none" />
            <div className="bg-[#001100] border border-[#0a4d0a]/80 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] relative" style={{ borderRadius: '22px' }}>
              <div className="bg-gradient-to-b from-[#002a00] to-[#001a00] px-4 py-2.5 border-b border-[#0a4d0a]/60" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0f0] opacity-70 shadow-[0_0_4px_rgba(0,255,0,0.6)]" />
                    <span className="text-[#0f0] text-sm font-bold crt-effect tracking-wide opacity-85">
                      RETRO TERMINAL v2.0
                    </span>
                  </div>
                  <div className="text-[#0f0] text-[10px] crt-effect opacity-50">
                    {new Date().toLocaleTimeString('ru-RU')}
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#0f0] text-xs crt-effect block opacity-75 tracking-wide">
                    {'>'} ВВЕДИТЕ ЗАПРОС:
                  </Label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Начните вводить текст..."
                    className="min-h-[90px] bg-[#000f00] border border-[#0a4d0a]/70 text-[#0f0] text-sm placeholder:text-[#0f0]/25 crt-effect focus:ring-1 focus:ring-[#0f0]/30 focus:border-[#0f0]/50 resize-none font-mono shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]"
                    disabled={isTyping}
                  />
                </div>

                <div className="flex items-center justify-between bg-[#000f00] p-3 rounded-md border border-[#0a4d0a]/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
                  <Label htmlFor="storyboard-mode" className="text-[#0f0] text-xs crt-effect cursor-pointer opacity-75 tracking-wide">
                    РЕЖИМ РАСКАДРОВКИ
                  </Label>
                  <Switch
                    id="storyboard-mode"
                    checked={storyboardMode}
                    onCheckedChange={setStoryboardMode}
                    className="data-[state=checked]:bg-[#0f0]/30"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isTyping || !input.trim()}
                  className="w-full bg-gradient-to-b from-[#0a4d0a] to-[#063306] hover:from-[#0f0]/25 hover:to-[#0a4d0a] text-[#0f0] font-bold text-sm py-4 rounded-md border border-[#0f0]/40 shadow-[0_2px_8px_rgba(0,255,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all disabled:opacity-40 disabled:cursor-not-allowed tracking-wide"
                >
                  {isTyping ? '[ ГЕНЕРАЦИЯ... ]' : '[ ЗАПУСТИТЬ ГЕНЕРАЦИЮ ]'}
                </Button>

                {displayText && (
                  <div className="bg-[#000a00] p-4 rounded-md border border-[#0a4d0a]/70 min-h-[180px] relative overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]">
                    <div className="absolute inset-0 scanlines opacity-8" />
                    <pre className="text-[#0f0] text-xs crt-effect whitespace-pre-wrap break-words font-mono relative z-10 opacity-85 leading-relaxed">
                      {displayText}
                      {isTyping && showCursor && (
                        <span className="inline-block w-1.5 h-3.5 bg-[#0f0] ml-1 opacity-70" />
                      )}
                    </pre>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-t from-[#002a00] to-[#001a00] px-4 py-2.5 border-t border-[#0a4d0a]/60" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <div className="flex items-center justify-between text-[#0f0] text-[10px] crt-effect opacity-50 tracking-wider">
                  <span>STATUS: READY</span>
                  <span>SYS: ONLINE</span>
                  <span>{storyboardMode ? 'STORYBOARD' : 'STANDARD'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[#0f0] text-xs crt-effect opacity-50">
              RETRO GENERATOR SYSTEM © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;