<template>
  <div class="min-h-[calc(100vh-132px)] bg-gradient-to-br from-orange-50 via-white to-orange-50 p-10 flex flex-col items-center">
    <div class="max-w-6xl w-full mb-16">
      <div class="relative text-center">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent rounded-2xl blur-3xl"></div>
        <h1 class="relative text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-3">
          Nossos Serviços
        </h1>
        <div class="h-1 w-40 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full mx-auto"></div>
        <p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Soluções completas para manter sua operação industrial funcionando com máxima eficiência
        </p>
      </div>
    </div>

    <div class="max-w-6xl w-full grid gap-10 md:grid-cols-3">
      <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 
                  border-2 border-orange-100 hover:border-orange-400 
                  transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10">
          <div class="bg-orange-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 
                      group-hover:bg-orange-400 transition-colors duration-300">
            <svg class="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          
          <h2 class="text-2xl font-bold mb-4 text-orange-400 group-hover:text-orange-500 transition-colors">
            Manutenção Preventiva
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Acompanhamento sistemático e verificações periódicas que previnem problemas antes que aconteçam, 
            prolongando a vida útil de suas máquinas e equipamentos.
          </p>
        </div>
      </div>

      <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 
                  border-2 border-orange-100 hover:border-orange-400 
                  transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10">
          <div class="bg-orange-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 
                      group-hover:bg-orange-400 transition-colors duration-300">
            <svg class="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          
          <h2 class="text-2xl font-bold mb-4 text-orange-400 group-hover:text-orange-500 transition-colors">
            Manutenção Corretiva
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Resposta ágil para emergências e quebras inesperadas, restaurando suas operações 
            rapidamente e reduzindo ao mínimo as interrupções na linha de produção.
          </p>
        </div>
      </div>

      <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 
                  border-2 border-orange-100 hover:border-orange-400 
                  transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10">
          <div class="bg-orange-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 
                      group-hover:bg-orange-400 transition-colors duration-300">
            <svg class="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          
          <h2 class="text-2xl font-bold mb-4 text-orange-400 group-hover:text-orange-500 transition-colors">
            Consultoria Técnica
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Avaliação especializada e orientações estratégicas para aperfeiçoar seus métodos de trabalho 
            e maximizar o desempenho de toda a sua estrutura industrial.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>