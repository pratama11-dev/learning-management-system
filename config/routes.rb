
require 'sidekiq/web'
require 'sidekiq-scheduler/web'

Rails.application.routes.draw do
  root to: "homes#index"

  #Authentications
  namespace :authentications do
    resources :passwords, only: [:create, :new, :edit, :update]
    resources :sessions, only: [:create, :new, :destroy]
  end

  namespace :registrations do
    resources :sign_up, only: [:new]
    resources :confirmations, only: [:create]

    get "confirmations/new", to: "confirmations#new", as: :new_confirmations
    get "confirmations/show", to: "confirmations#show", as: :show_confirmations
    post "confirmations/send_confirmation", to: "confirmations#send_confirmation", as: :send_confirmations
  end

  constraints Clearance::Constraints::SignedIn.new { |user| user.is_admin? } do
    mount Sidekiq::Web, at: '/sidekiq'
  end

  #User
  resources :users
  resources :search, only: [:index, :show]
  resources :profiles, only: [:index, :update]
  resources :dashboards, only: :index
  resources :memberships, only: [:index, :new]
  resources :notifications, only: [:index, :create]
  resources :user_likes, only: [:create]
  resources :user_bookmarks, only: [:create]
  resources :user_ratings, only: [:create]
  resources :user_webinars, only: [:create, :destroy]
  resources :user_certificates, only: [:create, :index]
  resources :workshops
  resources :libraries, only: [:index, :show]
  resources :lessons, only: [:show]
  resources :courses, only: [:index, :show]

  # get "courses", to: "courses#show"
  # get "courses", to: "courses#index", as: :course
  get "watch/:id", to: "videos#show", as: :video
  get "next_video/:id", to: "videos#next_video", as: :next_video
  get 'ajax_timestamp/:id', to: 'videos#ajax_timestamp', as: :ajax_timestamp
  get 'index_partial', to: 'homes#ajax_index_partial', as: :index_partial
  get 'index_phone_partial', to: 'homes#ajax_index_phone_partial', as: :index_phone_partial
  get 'show_curriculum_partial', to: 'homes#ajax_show_curriculum_partial', as: :show_curriculum_partial
  get 'show_brevet_partial', to: 'homes#ajax_show_brevet_partial', as: :show_brevet_partial

  get "talks/:id", to: "talks#show", as: :talk
  get "webinars/:slug", to: "webinars#show", as: :webinar
  get "memberships/payment", to: "memberships#payment", as: :memberships_payment
  get 'generate_certificate', to: 'user_certificates#generate_certificate', as: :generate_certificate

  get "quizes/:id", to: "quizes#show", as: :quizes
  get 'ajax_show_quiz/:id', to: 'quizes#ajax_show_quiz', as: :ajax_show_quiz
  post 'ajax_answer_quiz/:id', to: 'quizes#ajax_answer_quiz', as: :ajax_answer_quiz
  post 'ajax_submit_quiz/:id', to: 'quizes#ajax_submit_quiz', as: :ajax_submit_quiz

  get "exams/:id", to: "exams#show", as: :exams
  get "remedial_exam/:id", to: "exams#remedial_exam", as: :remedial_exam
  get 'ajax_show_exam/:id', to: 'exams#ajax_show_exam', as: :ajax_show_exam
  get 'review_exam/:id', to: 'exams#review_exam', as: :review_exam
  post 'ajax_answer_exam/:id', to: 'exams#ajax_answer_exam', as: :ajax_answer_exam
  post 'ajax_submit_exam/:id', to: 'exams#ajax_submit_exam', as: :ajax_submit_exam

  #Admin
  get '/admin', to: redirect('admin/dashboard')
  namespace :admin do
    get 'dashboard', to: 'dashboards#index', as: :dashboard

    resources :videos
    post "video/upload", to: "videos#upload", as: :upload_videos
    post "video/update_timestamp", to: "videos#update_timestamp", as: :timestamp_videos

    resources :ratings
    get 'banners', to: 'banners#index', as: :banners
    post 'new_banner', to: 'banners#create', as: :new_banner
    delete 'delete_banners/:id', to: 'banners#destroy', as: :delete_banners

    resources :courses
    resources :curriculums
    get 'select_questions', to: 'curriculums#select_questions', as: :select_questions
    post 'add_questions', to: 'curriculums#add_questions', as: :add_questions

    resources :talks
    post "number_order_talks", to: "talks#number_order_talks", as: :number_order_talks
    resources :webinars, only: [:index, :create]

    get "webinars/:slug", to: "webinars#show", as: :webinar
    put "webinars/:slug", to: "webinars#update", as: :update_webinar
    delete "webinars/:slug", to: "webinars#destroy", as: :destroy_webinar

    resources :lessons
    get 'select_quiz', to: 'lessons#select_quiz', as: :select_quiz
    post 'add_quiz', to: 'lessons#add_quiz', as: :add_quiz

    resources :exams
    get 'download_exam_template', to: 'exams#download_exam_template', as: :download_exam_template
    post "upload_exam", to: "exams#upload_exam", as: :upload_exam
    delete "destroy_exam_category", to: "exams#destroy_exam_category", as: :destroy_exam_category
    
    resources :auto_courses, only: [:index, :create, :destroy]
    post "upload_auto_courses", to: "auto_courses#upload_auto_courses", as: :upload_auto_courses
    get "download_auto_courses", to: "auto_courses#download_auto_courses", as: :download_auto_courses

    resources :users
    resources :libraries
    resources :payment_reports
  end

  #API
  namespace :api do
    namespace :videos do
      post "callback", to: "callbacks#show", as: :callback
    end

    #api_datatables
    namespace :admin do
      namespace :webinars do
        namespace :users do
          post 'get-all/:webinar_id', to: 'index#show', as: :index
        end
      end
    end
    namespace :ratings do
      post 'get-all', to: 'index#show', as: :index
    end
    namespace :courses do
      post 'get-all', to: 'index#show', as: :index
    end
    namespace :lessons do
      post 'get-all', to: 'index#show', as: :index
    end
    namespace :talks do
      post 'get-all', to: 'index#show', as: :index
    end
    namespace :webinars do
      post 'get-all', to: 'index#show', as: :index
    end
    namespace :videos do
      post 'get-all', to: 'index#show', as: :index
    end
    namespace :users do
      post 'get-all', to: 'index#show', as: :index
    end
  end

  get 'service-worker',
    to: 'utils#service_worker',
    as: :service_worker
end
