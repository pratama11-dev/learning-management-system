# frozen_string_literal: true

module Webinars
  class CreateService < ::Webinars::BaseService
    def action
      if webinar_params[:tag].present?
        new_tag = []
        webinar_params[:tag] = webinar_params[:tag].split(',')
        webinar_params[:tag].each do |tag|
          new_tag << tag.gsub('//', '')
        end
      end      
      webinar_params[:tag] = new_tag
      webinar.date = Time.zone.parse(webinar_params[:date].gsub(".",":")+":00")

      @params[:avatars].each do |_, avatar|
        webinar.speaker_avatars.attach(
          io: avatar[:speaker_avatar], 
          filename: avatar[:speaker_name]
        )        
      end

      webinar.speaker = webinar.speaker_avatars.attachments.map(&:filename).to_sentence
      webinar.save!
    end

    def webinar
      @webinar ||= Webinar.new(webinar_params)
    end
  end
end
