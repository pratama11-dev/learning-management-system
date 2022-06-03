# frozen_string_literal: true

class VideosController < ApplicationController
  before_action :require_login
  before_action :video, only: [:show, :next_video, :ajax_timestamp]
  
  def show    
    return redirect_to root_path, notice: 'video tidak ditemukan' if @video.blank?
    @is_control_enable = 'true'
    @is_update_timestamp = 'false'
    @is_video_talks = 'true'
    if @video.resource_class == "Lesson" && @video.source.present?
      set_lesson
      set_user_lesson 
      set_user_timestamp
      
      @is_control_enable = @user_timestamp.timestamp.to_i == @user_timestamp.max_timestamp.to_i
      @is_control_enable = 'false' if @user_timestamp.timestamp.to_i == 0
      
      @is_update_timestamp = 'true'
      @is_video_talks = 'false'
    end
  end
  
  def next_video
    return redirect_to video_path(id: @video.next_video.id) if @video.next_video.present?
    params = {}
    params = {
      lesson_id: @video.source.id
    } if @video.source.is_a?(Lesson)
    
    return redirect_to root_path(params), notice: 'video ini sudah terakhir'
  end

  def ajax_timestamp
    if @video.resource_class == "Lesson" && @video.source.present?
      set_lesson
      set_user_lesson 
      set_user_timestamp
      
      if request.headers['timestamp'].to_i > @user_timestamp.timestamp.to_i
        @user_timestamp.update(
          timestamp: request.headers['timestamp'], 
          max_timestamp: request.headers['duration']
        )
      end
    end

    return render json: {status: "success"}, status: 200
  end

  private
  def video
    @video = Video.find_by(id: params[:id])    
  end

  def set_lesson
    @lesson = @video.source
  end

  def set_user_lesson
    @user_lesson = UserLesson.find_or_initialize_by(
      lesson_id: @lesson.id, 
      user_id: current_user.id
    )

    @user_lesson.phase = "video" if @user_lesson.phase.blank?
    @user_lesson.save if @user_lesson.new_record?    
  end

  def set_user_timestamp
    @user_timestamp = UserLessonsTimestamp.find_or_initialize_by(
      user_id: current_user.id,
      lesson_id: @lesson.id,
      user_lesson_id: @user_lesson.id
    )

    @user_timestamp.save if @user_timestamp.new_record?
  end
end
