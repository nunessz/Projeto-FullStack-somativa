<template>
  <div class="min-h-[calc(100vh-132px)] bg-gradient-to-br from-orange-50 to-white p-10 flex flex-col items-center">
    <div class="max-w-6xl w-full">
      <h1 class="text-5xl font-extrabold text-orange-400 mb-4 text-center tracking-tight">
        Contato
      </h1>
      <p class="text-gray-600 text-center mb-16 text-lg">Entre em contato conosco através dos canais abaixo</p>

      <div class="grid gap-10 md:grid-cols-3">

        <div class="group relative bg-white rounded-3xl p-8 border-2 border-orange-100 
                    hover:border-orange-400 transition-all duration-500 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10">
            <div class="bg-orange-50 rounded-full w-20 h-20 flex items-center justify-center mb-6 
                        group-hover:bg-orange-400 transition-colors duration-300">
              <img src="/ping.png" alt="Localização" class="h-10 w-auto group-hover:brightness-0 group-hover:invert transition-all duration-300" />
            </div>
            <h2 class="text-2xl font-bold mb-3 text-orange-400 group-hover:text-orange-500 transition-colors">Endereço</h2>
            <p class="text-gray-600 leading-relaxed">Rua Pastor Cicero Canuto de Lima, 71, Campinas, SP</p>
          </div>
        </div>

        <div class="group relative bg-white rounded-3xl p-8 border-2 border-orange-100 
                    hover:border-orange-400 transition-all duration-500 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10">
            <div class="bg-orange-50 rounded-full w-20 h-20 flex items-center justify-center mb-6 
                        group-hover:bg-orange-400 transition-colors duration-300">
              <img src="/phone.png" alt="Telefone" class="h-10 w-auto group-hover:brightness-0 group-hover:invert transition-all duration-300" />
            </div>
            <h2 class="text-2xl font-bold mb-3 text-orange-400 group-hover:text-orange-500 transition-colors">Telefone</h2>
            <p class="text-gray-600 leading-relaxed">(19) 99896-4567</p>
          </div>
        </div>

        <div class="group relative bg-white rounded-3xl p-8 border-2 border-orange-100 
                    hover:border-orange-400 transition-all duration-500 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10">
            <div class="bg-orange-50 rounded-full w-20 h-20 flex items-center justify-center mb-6 
                        group-hover:bg-orange-400 transition-colors duration-300">
              <img src="/mail.png" alt="Email" class="h-10 w-auto group-hover:brightness-0 group-hover:invert transition-all duration-300" />
            </div>
            <h2 class="text-2xl font-bold mb-3 text-orange-400 group-hover:text-orange-500 transition-colors">Email</h2>
            <p class="text-gray-600 leading-relaxed">danilo.fernandes13@senaisp.edu.br</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>