<template>
  <div class="min-h-[calc(100vh-132px)] flex flex-col justify-between p-10 bg-gradient-to-br from-orange-50 via-white to-orange-50">

    <div class="container mx-auto relative">
      <div class="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-orange-400/5 rounded-3xl blur-xl"></div>
      <div class="relative bg-white border-2 border-orange-100 rounded-3xl p-10 md:p-12 backdrop-blur-sm">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-2">
              Bem-vindo à ProMaq Solutions.
            </h1>
            <div class="h-1 w-24 bg-orange-400 rounded-full mt-3 mx-auto md:mx-0"></div>
          </div>
          <div class="flex-1 text-center md:text-right">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-500 tracking-wide">
              Manutenção industrial
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center mt-10">
      <button
        class="group relative bg-gradient-to-r from-orange-400 to-orange-500 text-white px-12 py-5 rounded-2xl 
               shadow-lg shadow-orange-400/30 hover:shadow-2xl hover:shadow-orange-400/50 
               hover:scale-110 transition-all duration-300 overflow-hidden"
        type="button"
      >
        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span class="relative text-xl font-bold tracking-wide flex items-center gap-3">
          Solicitar orçamento
          <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>