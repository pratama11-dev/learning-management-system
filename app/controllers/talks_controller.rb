# frozen_string_literal: true

class TalksController < ApplicationController
  before_action :talk, only: :show
  layout 'homes'

  def show
    return redirect_to root_path, notice: 'Taxsamtalks tidak ditemukan' if talk.blank?
  end

  private

  def talk
    @talk ||= Talk.find_by(id: params[:id])
  end
end
